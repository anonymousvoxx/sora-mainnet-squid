import dotenv from 'dotenv'
import chains from './chains'

dotenv.config()

const indexerChain = process.env.INDEXER_ENVIRONMENT || 'dev'
const chainConfig = chains[indexerChain as keyof typeof chains]

if (!chainConfig) {
	throw new Error(`Chain ${indexerChain} is not defined`)
}

export const { chain, archive } = chainConfig
export const startBlock = process.env.INDEXER_START_BLOCK ? parseInt(process.env.INDEXER_START_BLOCK) : 0
export const testLogMode = process.env.INDEXER_TEST_LOG_MODE ? process.env.INDEXER_TEST_LOG_MODE === 'true' : false
export const performanceLogMode = process.env.INDEXER_PERFORMANCE_LOG_MODE ? process.env.INDEXER_PERFORMANCE_LOG_MODE === 'true' : false
export const performanceLogMinTime = process.env.INDEXER_PERFORMANCE_LOG_MIN_TIME
	? parseInt(process.env.INDEXER_PERFORMANCE_LOG_MIN_TIME)
	: 0
