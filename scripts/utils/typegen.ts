import { Chain } from '../../src/chains'

export function getTypegenConfig(chain: Chain) {
	return {
		outDir: `src/types/generated/${chain}`,
		specVersions: `spec/${chain}.jsonl`,
		typesBundle: 'src/typesBundle.json',
		events: true,
		calls: true,
		storage: true,
	}
}
