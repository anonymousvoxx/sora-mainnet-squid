import { Chain, chains } from '../src/chains'

const args = process.argv.slice(2)

const fs = require('fs')

const chain = args[0] as Chain
const config = chains[chain]

async function fetchSpecVersions() {
	try {
		fs.mkdirSync('spec')
	} catch (err) {}
	fs.writeFileSync('scripts/fetch-spec-versions.sh', `npx squid-substrate-metadata-explorer --rpc ${config.chain} --out spec/${chain}.jsonl`, { mode: 0o755 });
}

fetchSpecVersions().catch(console.error)
