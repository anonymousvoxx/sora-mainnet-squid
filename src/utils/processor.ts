import { Block, BlockContext, Call, Event } from '../types'

type CallItem = { kind: 'call'; call: Call<any> }
type EventItem = { kind: 'event'; event: Event<any> }
type Item = CallItem | EventItem

const getItems = (block: Block): Item[] => {
	return [
		...block.calls.map(call => ({ kind: 'call', call }) as CallItem),
		...block.events.map(event => ({ kind: 'event', event }) as EventItem)
	]
}

export const getSortedItems = (block: Block): Item[] => {
	const items = getItems(block)

	// Step 1: Split the array by groups with equal item.extrinsic.hash
	const groups: Item[][] = []

	items.forEach((item: Item) => {
		const hash = item.kind === 'call' ? item.call.extrinsic?.hash : item.event.extrinsic?.hash
		const lastGroup = groups[groups.length - 1]
		const lastGroupExtrinsicHash =
			lastGroup?.[0].kind === 'call' ? lastGroup[0].call.extrinsic?.hash : lastGroup?.[0].event.extrinsic?.hash
		if (lastGroup && lastGroupExtrinsicHash === hash) {
			lastGroup.push(item)
		} else {
			groups.push([item])
		}
	})

	// Step 2: Sort groups by the extrinsic index
	groups.sort((a, b) => {
		const aExtrinsicIndex =
			a[0].kind === 'call' ? a[0].call.extrinsic?.index ?? 0 : a[0].event.extrinsic?.index ?? 0
		const bExtrinsicIndex =
			b[0].kind === 'call' ? b[0].call.extrinsic?.index ?? 0 : b[0].event.extrinsic?.index ?? 0
		return aExtrinsicIndex - bExtrinsicIndex
	})

	// Step 3: Sort items in each group
	groups.map((group) => {
		return group.sort((a, b) => {
			if (a.kind === 'call' && b.kind !== 'call') {
				return -1 // Prioritize 'call'
			} else if (a.kind !== 'call' && b.kind === 'call') {
				return 1 // Deprioritize other kinds
			} else {
				return 0 // Keep order for items with the same kind
			}
		})
	})

	// Step 3: Join the groups in their original order
	return groups.flat(1)
}