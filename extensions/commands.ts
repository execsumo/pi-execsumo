import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/** Claude Code-compatible aliases for common session commands. */
export default function commands(pi: ExtensionAPI) {
  pi.registerCommand("clear", {
    description: "Clear the conversation and start a new session",
    handler: async (_args, ctx) => {
      const result = await ctx.newSession();
      if (result.cancelled) {
        ctx.ui.notify("Clear cancelled", "info");
      }
    },
  });

  pi.registerCommand("exit", {
    description: "Exit pi",
    handler: async (_args, ctx) => {
      ctx.shutdown();
    },
  });
}
