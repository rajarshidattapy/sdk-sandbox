# sdk-sandbox

Integration tests for [**@bento.fun/sdk**](https://www.npmjs.com/package/@bento.fun/sdk) installed from **npm** — not the Bento monorepo workspace.

Use this repo to smoke-test a published SDK version, onboard new developers, or validate docs examples against live APIs.

**Documentation:** [docs.bento.fun](https://docs.bento.fun) · [Test the SDK guide](https://docs.bento.fun/guides/test-the-sdk)

## Quick start

```bash
git clone https://github.com/Bentodotfun/sdk-sandbox.git
cd sdk-sandbox
cp .env.example .env
npm install
npm run test:import   # no network — start here
npm test              # live public API checks
```

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `BENTO_URL` | Yes (for live tests) | Markets host, e.g. `https://mainnet-server.bento.fun` |
| `PARLAY_TOURNAMENT_URL` | No | Tournaments / parlay host; omit to skip tournaments checks |

## Scripts

| Command | What it checks |
|---------|----------------|
| `npm run test:import` | Package imports, `createBentoSdk()`, client types |
| `npm run test:markets` | `listDuels`, `protocolStats`, `getDuelById` (uses `duelId`) |
| `npm run test:tournaments` | `parlay.listMarkets`, `tournaments.list` (wrapped responses) |
| `npm test` | All of the above |

## What this validates

- npm install resolves `@bento.fun/sdk` and TypeScript types load
- `createBentoSdk()` works from published `dist/`
- Public HTTP calls succeed against real backends
- Common pitfalls: use **`duelId`** (on-chain) not `id` (database) for `getDuelById`

## Testing a new SDK version

```bash
npm install @bento.fun/sdk@0.5.3
npm test
```

Update the version in `package.json` and commit when you bump the pin.

## Reporting issues

- SDK bugs → [bento.fun issues](https://github.com/Bentodotfun/bento.fun/issues)
- Sandbox / test gaps → [this repo's issues](https://github.com/Bentodotfun/sdk-sandbox/issues)

## License

MIT
