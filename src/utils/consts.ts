import { SnapshotType } from '../model'
import { AssetId } from '../types'

export const XOR = '0x0200000000000000000000000000000000000000000000000000000000000000' as AssetId
export const VAL = '0x0200040000000000000000000000000000000000000000000000000000000000' as AssetId
export const PSWAP = '0x0200050000000000000000000000000000000000000000000000000000000000' as AssetId
export const DAI = '0x0200060000000000000000000000000000000000000000000000000000000000' as AssetId
export const ETH = '0x0200070000000000000000000000000000000000000000000000000000000000' as AssetId
export const XSTUSD = '0x0200080000000000000000000000000000000000000000000000000000000000' as AssetId
export const XST = '0x0200090000000000000000000000000000000000000000000000000000000000' as AssetId
export const TBCD = '0x02000a0000000000000000000000000000000000000000000000000000000000' as AssetId

export const predefinedAssets = {
	'XOR': XOR,
	'VAL': VAL,
	'PSWAP': PSWAP,
	'DAI': DAI,
	'ETH': ETH,
	'XSTUSD': XSTUSD,
	'XST': XST,
	'TBCD': TBCD,
}

export const BASE_ASSETS = [XOR, XSTUSD]

export const DOUBLE_PRICE_POOL = [VAL, PSWAP, DAI, ETH, XST, TBCD]

export const SECONDS_IN_BLOCK = 6

// Intervals for snapshots (in seconds)
export const SnapshotSecondsMap = {
	[SnapshotType.DEFAULT]: 300, // 5 min
	[SnapshotType.HOUR]: 3_600, // hour
	[SnapshotType.DAY]: 86_400, // day
	[SnapshotType.MONTH]: 2_592_000, // month (30 days)
}

interface SnapshotTimeDepthMap {
	[SnapshotType.DEFAULT]: number;
	[SnapshotType.HOUR]: number;
	[key: string]: number | undefined;
  }

export const SnapshotTimeDepthMap: SnapshotTimeDepthMap = {
	[SnapshotType.DEFAULT]: 60 * 60 * 24 * 7, // week
	[SnapshotType.HOUR]: 60 * 60 * 24 * 30, // month
}