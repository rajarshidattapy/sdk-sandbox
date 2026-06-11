import { runImportSmoke } from './import-smoke.js';
import { runMarketsPublic } from './markets-public.js';
import { runTournamentsPublic } from './tournaments-public.js';

async function main(): Promise<void> {
  console.log('Bento SDK sandbox — testing @bento.fun/sdk from npm');
  await runImportSmoke();
  await runMarketsPublic();
  await runTournamentsPublic();
  console.log('\nAll sandbox checks passed.\n');
}

main().catch((error) => {
  console.error('\nSandbox failed:', error);
  process.exit(1);
});
