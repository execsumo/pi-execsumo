import { homedir } from "node:os";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { truncateToWidth } from "@earendil-works/pi-tui";

function formatTokens(tokens: number | null): string {
	if (tokens === null) return "?";
	return `${Math.round(tokens / 1_000)}k`;
}

interface UsageEntry {
	type: string;
	message?: { usage?: { cost?: { total?: number } } };
}

function sessionCost(ctx: { sessionManager: { getBranch(): unknown[] } }): number {
	return (ctx.sessionManager.getBranch() as UsageEntry[]).reduce(
		(total, entry) => total + (entry.message?.usage?.cost?.total ?? 0),
		0,
	);
}

function formatCost(cost: number): string {
	return cost < 10 ? `$${cost.toFixed(2)}` : `$${Math.round(cost)}`;
}

export default function minimalFooter(pi: ExtensionAPI) {
	pi.on("session_start", (_event, ctx) => {
		if (ctx.mode !== "tui") return;

		ctx.ui.setFooter((tui, theme, footerData) => {
			const unsubscribe = footerData.onBranchChange(() => {
				// Pi also refreshes the footer during streaming; this handles branch
				// changes and newly completed tool results explicitly.
				tui.requestRender();
			});

			return {
				dispose: unsubscribe,
				invalidate() {},
				render(width: number): string[] {
					const cwd = process.cwd();
					const home = homedir();
					const directory = cwd === home ? "~" : cwd.startsWith(`${home}/`) ? `~${cwd.slice(home.length)}` : cwd;
					const rawModel = ctx.model?.id ?? "no-model";
					const model = rawModel.split("/").pop() ?? "no-model";
					const reasoning = pi.getThinkingLevel();
					const usage = ctx.getContextUsage();
					const context = formatTokens(usage?.tokens ?? null);

					const cost = formatCost(sessionCost(ctx));
					const text = [
						theme.fg("muted", directory),
						theme.fg("dim", " · "),
						theme.getThinkingBorderColor(reasoning)(model),
						theme.fg("dim", " · "),
						theme.fg("muted", reasoning),
						theme.fg("dim", " · "),
						theme.fg("muted", context),
						theme.fg("dim", " · "),
						theme.fg("muted", cost),
					].join("");

					return [truncateToWidth(text, width)];
				},
			};
		});
	});
}
