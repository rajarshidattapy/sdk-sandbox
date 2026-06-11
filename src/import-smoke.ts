import {
  BENTO_API_PREFIX,
  createBentoSdk,
  PublicClient,
  RealtimeClient,
  UserClient,
  walletAuthProvider,
} from '@bento.fun/sdk';

function ok(label: string): void {
  console.log(`  ✓ ${label}`);
}

export async function runImportSmoke(): Promise<void> {
  console.log('\n[import-smoke] npm package surface');

  if (BENTO_API_PREFIX !== '/bento') {
    throw new Error(`Expected BENTO_API_PREFIX /bento, got ${BENTO_API_PREFIX}`);
  }
  ok('BENTO_API_PREFIX');

  const sdk = createBentoSdk({
    baseUrl: 'https://example.com',
    auth: walletAuthProvider(() => ({})),
  });

  if (!(sdk.public instanceof PublicClient)) throw new Error('sdk.public missing');
  if (!(sdk.user instanceof UserClient)) throw new Error('sdk.user missing');
  if (!(sdk.realtime instanceof RealtimeClient)) throw new Error('sdk.realtime missing');
  ok('createBentoSdk() returns public / user / realtime');

  ok('import smoke passed');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runImportSmoke().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
