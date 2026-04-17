# AGENTS Guide - `website`

## Purpose
- Public website frontend for the PowerMenu ecosystem.
- Separate from admin/customer apps, with its own dependency and route surface.

## Stack Snapshot
- Framework: Next.js `16.2.1` + React `19.2.4`.
- Language: TypeScript.
- Styling/UI: Tailwind CSS v4, CVA utilities, Ant Design, motion/animation tooling.
- Forms/validation: React Hook Form + Zod.

## Key Folders
- `app/`: App Router pages (`page.tsx`, root layout and globals).
- `components/`: reusable website components.
- `lib/`, `utils/`: helper logic and shared utilities.
- `public/`: static assets.

## Runbook
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## Environment Notes
- Env files found: `.env`.
- Keep all secret values out of source and generated docs.

## Agent Working Rules
- Treat this as a Next.js 16 codebase; do not assume older Next APIs.
- Reuse existing component conventions in `components/` before adding new UI systems.
- Keep marketing-page performance in mind (bundle size and hydration cost).
- Prefer server components by default unless client interactivity is required.

## Ecosystem Context
- This repo lives beside other PowerMenu apps (`powermenu-admin`, `client`, `menu-link-page`, `menu-preview`, `powermenu-strapi`, `power-ai`).
- Avoid accidental cross-repo assumptions unless a contract is explicitly shared.
