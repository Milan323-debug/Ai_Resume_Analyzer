# Project structure and file map

This document describes the recommended file structure for the Resume Analyzer project and explains the purpose of the main directories and files.

Recommended (canonical) layout

```
/
  /app                # Primary application source (React + routes)
    /components       # Reusable React components
    /routes           # Route containers (pages)
    /welcome          # Onboarding / assets
    root.tsx
    app.css
  /lib                # Utilities and helpers (PDF conversion, parsers)
  /constants          # App-level constants and config objects
  /public             # Static assets served at /. Accessible in build output
  /scripts            # Developer scripts (restructure, maintenance)
  /docs               # Project documentation (this file)
  /types              # Global or ambient type declarations
  /build or /dist     # Generated production output (ignored in source)
  package.json
  tsconfig.json
  vite.config.ts
```

Key entries explained

- `app/` — source code for the client. Keep components small and focused. `routes.ts` should only define route-to-component mapping.
- `lib/` — thin utilities that may be reused in both client and service code. Example: `pdftoimage.ts`.
- `public/` — static files such as `pdf.worker.min.mjs`, icons, and images. Keep large binaries out of git if possible.
- `scripts/restructure.ps1` — helper that lists or applies file moves. Use it when reorganizing the repo.

Migration plan (safe)

1. Commit any uncommitted work or stash it.
2. Run the restructure script with `-DryRun` to preview changes.
3. Inspect the preview. If it looks correct, run with `-Apply`.
4. Run the app (`npm install && npm run dev`) and run basic smoke tests.
5. Fix any import paths that may need small edits.

Notes

- This is only a suggested layout. Keep existing project conventions and adapt gradually.
- For large refactors, prefer smaller incremental moves and update imports with an automated codemod or an editor-assisted rename tool.

If you'd like, I can: run the dry-run here and provide the exact move list; or apply moves and fix imports automatically (but that is a larger change — I will request permission before applying). 
