import { getTypegenConfig } from './utils/typegen'
import { Chain } from '../src/chains'

const args = process.argv.slice(2)

const fs = require('fs')

const typegenJsonPath = './typegen.json'

const chain = args[0] as Chain

async function buildTypegenJson() {
	fs.writeFileSync(typegenJsonPath, JSON.stringify(getTypegenConfig(chain), null, 4))

	console.log(`${typegenJsonPath} for ${chain} successfully builded`)
}

buildTypegenJson().catch(console.error)
