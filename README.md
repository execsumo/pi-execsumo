# pi-execsumo

Personal Pi extensions, kept in a Git repo so changes can be reviewed, committed, and synced across devices.

## Contents

- `extensions/calm.ts` — `/calm` conversation-only presentation toggle.
- `extensions/commands.ts` — `/clear` and `/exit` aliases.
- `extensions/minimal-footer.ts` — compact directory/model/usage/cost footer.
- `extensions/lib/` — internal helpers used by Calm; do not load these directly.
- `themes/catppuccin-quiet.json` — the package's custom TUI theme.

## Development

Pi is configured to load this checkout directly. Start Pi from this repository when editing:

```bash
cd ~/projects/pi-execsumo
pi
```

After changing an extension, run `/reload`, then inspect the diff:

```bash
git diff --check
git diff
```

Commit and push changes when ready. The package version starts at `0.1.0`.

## Configuration

Calm's preference defaults to `~/.pi/config/calm` and is not stored in this repository. `FM_HOME`, `FM_ROOT_OVERRIDE`, and `FM_CONFIG_OVERRIDE` can override the Firstmate-compatible locations when needed.

## Installation on another device

Install the Git repository as a Pi package after cloning or publishing it:

```bash
pi install git:github.com/execsumo/pi-execsumo@v0.1.0
```

Use a release tag for reproducible installs; use `pi update --extensions` to reconcile installed packages.
