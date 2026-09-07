# Felváltom!

**[felvaltom.eu](https://felvaltom.eu)** — a small calculator that breaks a cash amount down into the exact banknotes and coins you'd need to hand over: type in an amount, pick a currency, and get a denomination-by-denomination breakdown.

Supports **HUF**, **EUR**, and **USD**, with the interface available in **Hungarian**, **English**, and **German**.

## What it does

- Enter an amount and currency, get a breakdown of banknotes and coins (largest denomination first), plus the subtotal each denomination contributes.
- Amount input formats live as you type, grouped per the active language's numeral convention (e.g. `100 000 000` in Hungarian, `100,000,000` in English, `100.000.000` in German).
- Keeps a local history of recent lookups (stored in `localStorage`) that can be reloaded with one click.
- Fully keyboard-operable, with visible focus states and a skip-to-content link.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) on [Vite](https://vite.dev/)
- [MUI](https://mui.com/) for components, with a custom theme (no default MUI styling)
- [react-router-dom](https://reactrouter.com/) for client-side routing
- [react-i18next](https://react.i18next.com/) + [i18next-http-backend](https://github.com/i18next/i18next-http-backend) for translations, loaded from `public/locales/{hu,en,de}/translation.json`
- [react-helmet-async](https://github.com/staylor/react-helmet-async) for per-page `<title>`/meta tags
- [react-ga4](https://github.com/codler/react-ga4) for analytics, gated behind cookie consent

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (Vite picks an open port starting at 5173).

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check, build for production, and copy `index.html` → `404.html` (so GitHub Pages serves the SPA for deep links like `/privacy-policy`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build, then publish `dist/` to GitHub Pages via `gh-pages` |

## Project structure

```
public/
  locales/{hu,en,de}/translation.json   translation strings
  manifest.json, robots.txt, sitemap.xml, og-image.png, ...
src/
  components/     UI building blocks (AmountInput, ResultTableView, HistoryList, ...)
  pages/          routed pages (Home, PrivacyPolicy, CookiePolicy, TermsOfUse, Impressum)
  logic/          pure calculation logic (denomination.ts, currencies.ts, history.ts)
  utils/          theme, i18n setup, number-formatting helpers, analytics
```

The actual denomination math lives in `src/logic/denomination.ts` and has no UI dependencies — currencies and their banknote/coin tables are defined there.

## Internationalization

Adding a language means adding `public/locales/<code>/translation.json` (copy an existing one and translate the values) and registering it in `src/components/LanguageSelector.tsx`. `hu` is the fallback language (see `src/i18n.ts`); the visitor's browser language is detected automatically on first visit.

## SEO

Each route sets its own `<title>`, meta description, and canonical URL via `react-helmet-async` (see the `<Helmet>` block in each page component). `public/sitemap.xml`, `public/robots.txt`, and the JSON-LD block in `index.html` are static and should be kept in sync with the domain if it ever changes.

## Deployment

The site is a static SPA hosted on GitHub Pages under the custom domain in `public/CNAME` (`felvaltom.eu`). `npm run deploy` builds and pushes `dist/` via `gh-pages`; there's no CI pipeline, so deploys are manual.
