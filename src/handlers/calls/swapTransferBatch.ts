import { addDataToHistoryElement, createCallHistoryElement, createEventHistoryElement, updateHistoryElementStats } from '../../utils/history'
import { getAssetId, formatU128ToBalance } from '../../utils/assets'
import { XOR } from '../../utils/consts'

import { Address, AssetId, BlockContext, Call } from '../../types'
import { getCallData, getEventData } from '../../utils/entities'
import { assertDefined, toAddress } from '../../utils'
import { findEventByExtrinsicHash, findEventsByExtrinsicHash } from '../../utils/events'
import { getCallHandlerLog, logStartProcessingCall } from '../../utils/logs'
import { getExtrinsicSigner } from '../../utils/calls'
import { calls, events } from '../../types/generated/merged'

function getLiquidityProxyBatchSwapExecutedEventData(ctx: BlockContext, extrinsicHash: string) {
	const name = 'LiquidityProxy.BatchSwapExecuted'
	const event = findEventByExtrinsicHash(ctx, extrinsicHash, [name])
	if (event === null) return null
	return getEventData(ctx, events.liquidityProxy.batchSwapExecuted, event)
}

function getTransactionPaymentTransactionFeePaidEventData(ctx: BlockContext, extrinsicHash: string) {
	const name = 'TransactionPayment.TransactionFeePaid'
	const event = findEventByExtrinsicHash(ctx, extrinsicHash, [name])
	if (event === null) return null
	return getEventData(ctx, events.transactionPayment.transactionFeePaid, event)
}

const handleAndSaveExtrinsic = async (ctx: BlockContext, call: Call<'LiquidityProxy.swap_transfer_batch'>): Promise<void> => {
	const blockNumber = ctx.block.header.height
	const historyElement = await createCallHistoryElement(ctx, call)

	const data = getCallData(ctx, calls.liquidityProxy.swapTransferBatch, call)

	const inputAssetId = getAssetId(data.inputAssetId)
	const extrinsicSigner = getExtrinsicSigner(ctx, call)

	const details: any = {}

	details.assetId = getAssetId(data.inputAssetId)
	details.selectedMarket = data.selectedSourceTypes.map((lst) => lst.toString()).toString()
	details.maxInputAmount = data.maxInputAmount
	details.blockNumber = blockNumber
	details.from = extrinsicSigner

	let receivers: { accountId: Address; assetId: AssetId; amount: string }[] = []

	if ('swapBatches' in data) {
		// fill receivers with assetId and amount
		for (const swapBatchInfo of data.swapBatches) {
			const assetId = getAssetId(swapBatchInfo.outcomeAssetId)

			for (const receiverInfo of swapBatchInfo.receivers) {
				receivers.push({
					accountId: toAddress(receiverInfo.accountId),
					assetId,
					amount: formatU128ToBalance(receiverInfo.targetAmount, assetId)
				})
			}
		}
	} else {
		// TODO: decide what to do with this
		// receivers = data.receivers.map((receiver) => {
		// 	return {
		// 		accountId: receiver.accountId,
		// 		assetId: getAssetId(receiver.assetId),
		// 		amount: formatU128ToBalance(receiver.tar, getAssetId(receiver.assetId))
		// 	}
		// })
	}

	details.receivers = receivers

	if (historyElement.execution.success) {
		assertDefined(call.extrinsic)
		const batchSwapExecutedEvent = getLiquidityProxyBatchSwapExecutedEventData(ctx, call.extrinsic.hash)
        if (batchSwapExecutedEvent) {
            const [adarFee, inputAmount] = batchSwapExecutedEvent
			details.adarFee = formatU128ToBalance(adarFee, inputAssetId)
			details.inputAmount = formatU128ToBalance(inputAmount, inputAssetId)
        }

		const transactionFeePaidEvent = getTransactionPaymentTransactionFeePaidEventData(ctx, call.extrinsic.hash)
		if (transactionFeePaidEvent) {
			const { actualFee } = transactionFeePaidEvent
			details.actualFee = formatU128ToBalance(actualFee, XOR)
		}

		const assetTransferEvents = findEventsByExtrinsicHash(ctx, call.extrinsic.hash, ['Assets.Transfer']).map((event) => {
			const eventData = getEventData(ctx, events.assets.transfer, event)
			const [from, to, asset, amount] = eventData
			return {
				from: toAddress(from),
				to: toAddress(to),
				amount: formatU128ToBalance(amount, getAssetId(asset)),
				assetId: getAssetId(asset),
				event
			}
		})
		const receiverIds = receivers.map((receiver) => receiver.accountId)

        for (const assetTransferEvent of assetTransferEvents) {
			const { from, to, assetId, amount, event } = assetTransferEvent
            const sender = from
            const receiver = to
            // if technical transfer, skip
            if (!(sender === extrinsicSigner && receiverIds.includes(receiver))) continue

            const transfer = {
                assetId,
                amount,
                from: sender,
                to: receiver,
            }

            // create history element for receiver
            await createEventHistoryElement(ctx, event, to, transfer)
        }
	}

	await addDataToHistoryElement(ctx, historyElement, details)
	await updateHistoryElementStats(ctx, historyElement)
}

export async function swapTransferBatchHandler(ctx: BlockContext, call: Call<'LiquidityProxy.swap_transfer_batch'>): Promise<void> {
	logStartProcessingCall(ctx, call)

	await handleAndSaveExtrinsic(ctx, call)

	getCallHandlerLog(ctx, call).debug('Saved swap transfer batch')
}
