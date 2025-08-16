# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Web App Interface Screenshots

<table>
  <tr>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/df16b139-3b9d-48e9-a500-36417bb93c42"
        alt="Home Screen"
        width="200" />
      <br />
      <sub>Home Screen</sub>
    </td>
    <td align="center">
      <img width="1903" height="922" alt="Screenshot 2025-08-16 152200" src="https://github.com/user-attachments/assets/69fe2900-687c-464b-bc5a-745a36f0d617" />
      <br />
      <sub>Resume Upload Screen</sub>
    </td>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/e8671c01-294d-4f7f-a382-20b810a47da8"
        alt="Resume analyzer Screen"
        width="200" />
      <br />
      <sub>Resume analyzer Screen</sub>
    </td>
  </tr>
</table>

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

## Resume Analyzer — README

A small, focused React + TypeScript app that analyzes uploaded resumes for ATS compatibility and provides a visual score and summary.

This README explains: quick start, development workflow, testing, recommended file structure, and an automated (safe) restructuring script you can run locally.

## Repo quick facts

- Framework: Vite + React + TypeScript
- Routing: React Router
- UI: TailwindCSS (optional presets present)
- PDF handling: client-side PDF-to-image utilities in `lib/`

## Quick start

1. Install dependencies

```powershell
npm install
```

2. Start dev server (uses your default shell — PowerShell on Windows)

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Run the production server (if available in scripts)

```powershell
npm start
```

If you rely on Docker, see the `Dockerfile` and the `scripts/` folder below for helpers.

## Project contract (tiny)

- Input: PDF or TXT resume file(s) uploaded via the UI
- Output: ATS score, parsed text, visual summaries, and downloadable report
- Error modes: invalid file type, corrupted PDF, large files (handled in UI)
- Success criteria: UI accepts a file, shows a score and a parsed summary

## Recommended file structure

This repo already contains many files; to make it easier to maintain we recommend a canonical layout. See `docs/STRUCTURE.md` for full descriptions. In short:

```
/
	/app                # source app code (already present)
		/components
		/routes
		/welcome
		root.tsx
	/lib                # small utilities, PDF helpers
	/constants
	/public
	/scripts            # dev/maintenance scripts (restructure helper included)
	/docs               # documentation (STRUCTURE.md)
	package.json
	tsconfig.json
	vite.config.ts
```

To apply this layout safely, a PowerShell helper script is provided at `scripts/restructure.ps1`. It performs a dry-run by default and can apply moves when you pass `-Apply`.

## How to run the restructure script (dry-run first)

Preview changes (recommended):

```powershell
pwsh ./scripts/restructure.ps1 -DryRun
```

Apply changes (make sure you have a git commit or stash first):

```powershell
pwsh ./scripts/restructure.ps1 -Apply
```

The script is careful: it prints planned moves, verifies sources exist, and prompts before applying.

## Development notes

- Linting: add ESLint/Prettier if you want consistent formatting (not included by default)
- Type checking: `npm run build` will surface TypeScript errors. Use `tsc --noEmit` for fast checks.
- Tests: add unit tests under `tests/` and wire a runner (Jest / Vitest)

## CI / Deployment

- A minimal CI pipeline should run: install, build, typecheck, and tests.
- Dockerfile exists for container builds; use `docker build -t resume-analyzer .` and run with `docker run -p 3000:3000 resume-analyzer`.

## Troubleshooting

- If `npm run dev` fails with port or environment issues, ensure no other process is using port 5173 or update `vite.config.ts`.
- If PDF parsing fails, check `public/pdf.worker.min.mjs` and the browser console for worker load errors.

## Contribution

- Create a branch per feature: `feat/<short-desc>`
- Make small, focused commits. Include tests for new logic.

## Files added in this change

- `docs/STRUCTURE.md` — detailed recommended structure and migration plan
- `scripts/restructure.ps1` — safe PowerShell script to preview and apply file moves

---

If you want, I can run the restructure script here (dry-run) and show the planned moves; tell me to proceed and I'll run it in your workspace.
