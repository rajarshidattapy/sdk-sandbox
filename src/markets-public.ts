import { pathToFileURL } from 'node:url';
import { createBentoSdk, walletAuthProvider } from '@bento.fun/sdk';
import { requireEnv } from './env.js';

function ok(label: string, detail?: string): void {
  console.log(`  ✓ ${label}${detail ? ` — ${detail}` : ''}`);
}

export async function runMarketsPublic(): Promise<void> {
  const baseUrl = requireEnv('BENTO_URL');
  console.log(`\n[markets-public] ${baseUrl}`);

  const sdk = createBentoSdk({
    baseUrl,
    auth: walletAuthProvider(() => ({})),
  });

  const duels = await sdk.public.listDuels({ page: 1, limit: 5 });
  if (!Array.isArray(duels.data)) {
    throw new Error('listDuels: expected data array');
  }
  ok('public.listDuels', `${duels.data.length} item(s)`);

  const stats = await sdk.public.protocolStats.getSummary();
  if (stats == null || typeof stats !== 'object') {
    throw new Error('protocolStats.getSummary: expected object');
  }
  ok('public.protocolStats.getSummary');

  const first = duels.data[0];
  if (first?.duelId) {
    const duel = await sdk.public.getDuelById({ duelId: first.duelId });
    if (!duel?.duelId) throw new Error('getDuelById: missing duelId in response');
    ok('public.getDuelById', duel.duelId);
  } else {
    console.log('  · skipped getDuelById (empty catalog)');
  }

  ok('markets public API passed');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runMarketsPublic().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
