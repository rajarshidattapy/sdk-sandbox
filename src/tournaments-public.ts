import { pathToFileURL } from 'node:url';
import { createBentoSdk, walletAuthProvider } from '@bento.fun/sdk';
import { optionalEnv, requireEnv } from './env.js';

function ok(label: string, detail?: string): void {
  console.log(`  ✓ ${label}${detail ? ` — ${detail}` : ''}`);
}

export async function runTournamentsPublic(): Promise<void> {
  const baseUrl = requireEnv('BENTO_URL');
  const tournamentsBaseUrl = optionalEnv('PARLAY_TOURNMENT_URL');

  if (!tournamentsBaseUrl) {
    console.log('\n[tournaments-public] skipped — set PARLAY_TOURNMENT_URL in .env');
    return;
  }

  console.log(`\n[tournaments-public] ${tournamentsBaseUrl}`);

  const sdk = createBentoSdk({
    baseUrl,
    tournamentsBaseUrl,
    auth: walletAuthProvider(() => ({})),
  });

  if (!sdk.tournaments) {
    throw new Error('sdk.tournaments is undefined');
  }

  const marketsResponse = await sdk.tournaments.parlay.listMarkets();
  const markets = (marketsResponse as { markets?: unknown[] }).markets;
  if (!Array.isArray(markets)) {
    throw new Error('parlay.listMarkets: expected { markets: [] }');
  }
  ok('tournaments.parlay.listMarkets', `${markets.length} market(s)`);

  const tournamentsResponse = await sdk.tournaments.tournaments.list({
    status: 'active',
  });
  const tournaments = (tournamentsResponse as { tournaments?: unknown[] })
    .tournaments;
  if (!Array.isArray(tournaments)) {
    throw new Error('tournaments.list: expected { tournaments: [] }');
  }
  ok('tournaments.tournaments.list', `${tournaments.length} tournament(s)`);

  ok('tournaments public API passed');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runTournamentsPublic().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
