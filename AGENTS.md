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

## Measurement
- Before changing anything that affects tracking, read `docs/medicion/README.md` (in Spanish). That includes analytics events, `data-track-*` attributes, sign-up or CTA links, section ids, cookie consent and the GTM container. The published GTM container is saved next to it.
- Measured clicks use `trackAttrs()` from `lib/analytics`, with event names from `lib/analytics/events.ts`.
- Sign-up links use `CTAButton` or `SignUpTextLink`. Links that only navigate inside the site use `nav_click`, never `sign_up_click`.
- New sections use `SectionContainer` with an `id` that is unique on the page. The `id` becomes `section_name` and the `location` of the buttons inside.
- Adding, renaming or removing an event also needs a GTM container change.
- Only `components/analytics/AnalyticsListener.tsx` pushes `page_view`.
- GTM routes everything under `/blog` to the blog GA4 property (variable `js.seccion`).
- AI sessions never log into GTM, Google Analytics or Meta. They prepare an import file from a fresh export, and Fede publishes it.
- Never send personal data in event params. Update the measurement map in the same PR as any tracking change.
