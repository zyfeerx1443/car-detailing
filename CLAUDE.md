# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing/booking landing page for "APEX Detailing", a car detailing studio in Warsaw. Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4, icons from `lucide-react`. **All user-facing copy is in Polish** — keep new text in Polish and consistent with the existing tone. There is no backend, API route, database, or test suite.

## Commands

```powershell
npm run dev     # dev server on http://localhost:3000
npm run build   # production build (also the main type-check gate)
npm run start   # serve the production build
npx tsc --noEmit  # type-check only
```

`npm run lint` runs `next lint`, but ESLint is not installed or configured, so it will prompt to set it up interactively — don't rely on it.

## Git workflow (standing instruction from the repo owner)

After every successful code change, **automatically commit and push to `main`** without asking:

1. Run `npm run build`. Commit only if it succeeds; if it fails, fix it or report — never commit a broken build.
2. `git add -A`, then `git commit` with a Conventional Commits message (`feat: …`, `fix: …`, `chore: …`, `docs: …`) describing the change.
3. `git push origin main`.

Never force-push, rewrite history, or skip hooks. Before committing, check `git status` that no collected contact data or secrets are staged (`scripts/leads/leads.*`, `scripts/leads/contacted.txt`, `.env*` are gitignored and must stay out of the repo).

## Lead scraper (`scripts/leads/`)

Separate Node package (own `package.json`, Playwright) excluded from the Next.js `tsconfig`. `scrape-leads.mjs` collects detailing studios from Google Maps without a real website; `regenerate.mjs` rebuilds messages/links from existing `leads.json` without scraping; shared helpers and the WhatsApp message template are in `lib.mjs`. Numbers in `contacted.txt` are skipped. Signed-out Google Maps hides review counts, so `reviews_count` is usually `null` (filter falls back to "has a rating").

## Architecture

- **Per-client personalization via URL params** `?name=`, `?address=`, `?phone=`: `src/app/page.tsx` (async server component, so `/` is dynamically rendered) awaits `searchParams`, builds a `StudioProfile` with `resolveStudioProfile` (sanitizes/limits input, falls back to `DEFAULT_STUDIO_NAME` / `DEFAULT_STUDIO_ADDRESS` / the default phone), and also uses it in `generateMetadata` for the `<title>`/OpenGraph (`buildPageTitle`). The profile is passed as a `studio` prop to `LandingClient` and down to Navbar, Hero, Calculator, About, BookingForm and Footer. Studio name/address/phone must come from `studio`, never be hardcoded; WhatsApp links use `buildWhatsAppUrl(message, studio.whatsappNumber)`.
- `src/components/LandingClient.tsx` (`"use client"`) owns all shared state and composes the sections in page order: Navbar → Hero → Services → Calculator → About → Reviews → BookingForm → Footer.
- **Shared state flow** (lives in `LandingClient`):
  - `vehicleClass` and `selectedServices` drive the `Calculator`. Clicking a card in `Services` adds that service and smooth-scrolls to `#kalkulator`.
  - "Zarezerwuj termin" in the Calculator "locks" a `CalculationSummary` and scrolls to `#rezerwacja`, where `BookingForm` shows it as the attached quote.
- **`src/data/studio.ts` is the single source of truth** for business data: `STUDIO_INFO` (brand-neutral defaults: phone, hours, rating — no brand, email or socials), `VEHICLE_CLASSES`, `SERVICE_CARDS` (marketing cards with price *ranges*), `CALCULATOR_SERVICES` (exact per-vehicle-class prices and hours), `REVIEWS`, `PARTNER_BRANDS`, plus `formatPLN` and `buildWhatsAppUrl`. `SERVICE_CARDS` and `CALCULATOR_SERVICES` are separate lists keyed by the shared `ServiceId` union — when changing a service or price, update both (e.g. `ppf_front` exists only in the calculator). Adding a service or vehicle class means extending the `ServiceId` / `VehicleClassId` unions too.
- **Pricing logic** is `buildCalculationSummary` in `src/components/Calculator.tsx`: sum of per-class prices, 10% package discount when ≥2 services are selected, and summed `hours` bucketed into a Polish duration label. The Calculator's UI copy mentions the 10% / 2-service rule explicitly, so keep the text in sync with the logic.
- **Booking is client-only**: `BookingForm` validates locally (Polish phone auto-formatted to `+48 XXX XXX XXX`), then shows a confirmation with a random `WAW-####` ID — nothing is sent anywhere. Actual contact happens through prefilled WhatsApp links (`buildWhatsAppUrl`).
- Section anchor IDs (Polish) are used by nav links and `scrollIntoView`: `uslugi`, `kalkulator`, `o-studiu`, `opinie`, `rezerwacja`, `kontakt`. Sections use `scroll-mt-24` to clear the fixed navbar.

## Styling

- Tailwind v4 via `@tailwindcss/postcss`; there is no `tailwind.config` — theme tokens are in the `@theme inline` block in `src/app/globals.css` (`crimson` colors, `font-sans` = Manrope, `font-display` = Plus Jakarta Sans, loaded via `next/font` in `layout.tsx`).
- Reusable surface/button classes are plain CSS in `globals.css`: `soft-card-light`, `soft-card-dark`, `soft-pill-crimson`, `soft-pill-dark-ghost`. Prefer these over re-creating the look with utilities.
- Brand accent is crimson `#c8102e` (often written as an arbitrary value like `bg-[#c8102e]`) on a near-black `#0a0a0b` background.
- `next.config.ts` sets `images.unoptimized: true`; static images are in `public/images/`.
- Path alias `@/*` → `src/*`.
