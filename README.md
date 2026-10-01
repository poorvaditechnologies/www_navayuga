# Navayuga Website

Single-page application built with **Vite + React 19 + TypeScript**, animated with
**[Motion](https://motion.dev)** (formerly Framer Motion), routed with **React Router**.

## Getting started

```bash
nvm use            # Node 22+ (see .nvmrc)
npm install
cp .env.example .env.local
npm run dev        # http://localhost:5173
```

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server with hot reload |
| `npm run build`     | Type-check and build to `dist/`      |
| `npm run preview`   | Serve the production build locally   |
| `npm run lint`      | Run ESLint (`lint:fix` to auto-fix)  |
| `npm run format`    | Format everything with Prettier      |
| `npm run typecheck` | TypeScript check only                |

Run `npm run lint && npm run build` before every push — both must pass.

## Folder structure

```
├── public/                  Static files served as-is (favicon, robots.txt, OG images)
├── src/
│   ├── app/                 App shell: App.tsx (providers) and router.tsx (routes)
│   ├── assets/              Files imported from code (bundled & hashed by Vite)
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/          Reusable building blocks — no page-specific content
│   │   ├── animations/      Motion wrappers (FadeIn, ScrollProgress, …)
│   │   ├── layout/          Navbar, Footer, MainLayout
│   │   └── ui/              Generic UI primitives (Button, Container, …)
│   ├── constants/           Site config & content constants (site.ts)
│   ├── data/                Static content lists (services, FAQs, testimonials…)
│   ├── hooks/               Custom React hooks (useXxx.ts)
│   ├── lib/                 Pure helpers & shared animation variants (motion.ts)
│   ├── pages/               One component per route, composed from sections
│   ├── sections/            Page sections, grouped by page (sections/home/…)
│   ├── services/            API calls / form submissions
│   ├── styles/              globals.css + variables.css (design tokens)
│   ├── types/               Shared TypeScript types
│   └── main.tsx             Entry point
├── .env.example             Environment variables template
└── index.html               HTML shell (title, meta, fonts)
```

Empty folders contain a `.gitkeep` so Git keeps them. Delete the `.gitkeep` once
you add a real file to that folder.

## Conventions

- **Imports:** use the `@/` alias (`import { Button } from '@/components/ui'`), not long `../../` paths.
- **Naming:** components and their files are `PascalCase.tsx`; hooks are `useCamelCase.ts`;
  everything else is `camelCase.ts`. Use named exports, not default exports.
- **One component per file**, with its styles beside it as `Component.module.css` (CSS Modules).
- **Barrel files:** each `components/*` and `sections/*` folder has an `index.ts` that re-exports
  its components. Add new components there.
- **Styling:** use the tokens in `src/styles/variables.css` (`var(--color-primary)`,
  `var(--space-4)`…). Don't hard-code brand colours.
- **Content:** text and lists belong in `constants/` or `data/`, not inside JSX.
- **Animation:** use the presets in `lib/motion.ts` and the wrappers in `components/animations`
  so motion stays consistent. `MotionConfig reducedMotion="user"` already respects users'
  reduced-motion setting.
- **Adding a section:** create `src/sections/home/NewSection.tsx` (+ `.module.css`), export it
  from `sections/home/index.ts`, and render it in `pages/HomePage.tsx`. Give it an `id` and add
  a link in `NAV_LINKS` (`constants/site.ts`) if it should appear in the navbar.
- **Adding a page:** create `src/pages/XxxPage.tsx` and register it in `src/app/router.tsx`.
- **Env vars:** must start with `VITE_` and are read via `import.meta.env.VITE_…`.
  Never put secrets in them; they are shipped to the browser.

## Git workflow

- Branch from `main`: `feature/<short-name>`, `fix/<short-name>`.
- Keep commits small; open a merge request into `main`.

## Deployment

`npm run build` outputs static files to `dist/`. Because this is an SPA, configure the
host to serve `index.html` for unknown paths (Netlify `_redirects`, Nginx `try_files`,
Vercel rewrites, etc.).
