# Ausfahrt Stromer

Ausfahrt Stromer is a German calculator that compares the total cost of owning a used electric car with the cost of a combustion car. You enter prices, mileage, energy costs, and running costs. The page shows what each option costs over 1 to 12 years, the annual mileage from which the electric car is cheaper, and the year in which it catches up. The interface is in German.

Live: https://www.ausfahrt-stromer.de

## Features

- Two scenarios: keep your combustion car or switch to a used electric car, or buy one of the two used.
- A cost breakdown for depreciation, interest on the money tied up in the car, fuel and electricity, vehicle tax, THG premium, insurance, maintenance, tires, and inspections.
- German vehicle tax rules: displacement and CO₂ tax for combustion cars, the electric car exemption that ends in 2035 at the latest, and the halved weight-based tax after it.
- A chart of the cumulative cost if you sell after n years, with the break-even point marked.
- Inputs are saved in your browser's `localStorage` and never leave it. Vercel Web Analytics and Speed Insights count page views and measure load times without cookies.
- A share link carries the inputs that differ from the defaults, base64url-encoded in the URL fragment. The fragment never reaches the server. Older links keep opening with the defaults they were created with.
- [docs/research/annahmen-2026-11.md](docs/research/annahmen-2026-11.md) documents the research behind every default value.

## Run it locally

You need Node.js 22.12 or later and pnpm 10.

```sh
pnpm install
pnpm dev
```

The app runs at http://localhost:3000. Before you push, run the same checks as CI:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Where the numbers live

The cost model is plain TypeScript in `src/domain/`, with no React, and Vitest covers it.

- `src/domain/defaults.ts` holds the default inputs and the list of sources behind them.
- `src/domain/tco.ts` computes the total cost per option and year.
- `src/domain/tax.ts` holds the vehicle tax tables.
- `src/domain/shareLink.ts` encodes and decodes share links.
- `src/domain/insights.ts` derives the break-even mileage, the break-even year, the cash needed today, CO₂, and the verdict.

## Deploy

Vercel builds the app from `main`. Canonical URLs, the sitemap, and social previews use `NEXT_PUBLIC_SITE_URL`, which defaults to `https://www.ausfahrt-stromer.de`. Requests to the old `ausfahrt-stromer.vercel.app` host redirect there.

The Overpass fonts in `src/assets/fonts/` are used only for the social preview image and are licensed under the [SIL Open Font License](src/assets/fonts/OFL.txt).

## Add a language

1. Copy `messages/de.json` to `messages/<locale>.json` and translate the values.
2. Add the locale to `locales` in `src/i18n/routing.ts`.

The sitemap, hreflang links, and preview images pick up new locales on their own.

German stays at `/`. Other languages get a prefix, for example `/en`. Numbers and currency follow the active locale.

## License

[MIT](LICENSE)
