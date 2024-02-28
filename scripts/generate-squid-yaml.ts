import { writeFileSync } from 'fs'
import * as path from 'path'
import * as YAML from 'js-yaml'
import dotenv from 'dotenv'

import { Chain, chains } from '../src/chains'

dotenv.config()

// Obtain chain from npm parameters if provided
let chain: Chain = (process.argv[2] as Chain) || (process.env.INDEXER_ENVIRONMENT as Chain) || Chain.DEV

// if provided chain does not match with known chains, default to DEV
if (!Object.values(Chain).includes(chain)) {
	chain = Chain.DEV
}

// Obtain chain details
const details = chains[chain]

// Create yaml configuration
const configuration = {
	manifestVersion: 'subsquid.io/v0.1',
	name: details.name,
	version: details.version,
	description: details.description,
	deploy: {
		addons: {
			postgres: {},
		},
		processor: {
			env: {
				INDEXER_ENVIRONMENT: chain,
				INDEXER_START_BLOCK: 0,
				SQD_DEBUG: 'sqd:processor:mapping',
			},
			cmd: ['node', 'lib/processor'],
		},
		api: {
			cmd: [
				'npx',
				'squid-graphql-server',
				'--subscriptions',
				'--dumb-cache',
				'in-memory',
				'--dumb-cache-ttl',
				'1000',
				'--dumb-cache-size',
				'100',
				'--dumb-cache-max-age',
				'1000',
			],
		},
	},
	scale: {
		dedicated: true,
		addons: {
			postgres: {
				profile: details.scaleProfiles.postgres,
				storage: details.storage,
			},
		},
		processor: {
			profile: details.scaleProfiles.processor,
		},
		api: {
			profile: details.scaleProfiles.api,
		},
	},
}

// Translate JSON to YAML
const yamlConfig = YAML.dump(configuration)

// Define the file name
const fileName = 'squid.yaml'

// Write the configuration to a yaml file
writeFileSync(fileName, yamlConfig)

// Get the full path of the file
const fullPath = path.resolve(fileName)

console.log(`The squid.yaml file for the ${chain} chain has been created at: ${fullPath}`)
