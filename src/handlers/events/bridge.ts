import { BlockContext, Event } from '../../types'
import { getEventData } from '../../utils/entities'
import { events } from '../../types/generated/merged'
import { createEventHistoryElement } from '../../utils/history'
import { logStartProcessingEvent } from '../../utils/logs'


export async function xcmPalletAttemptedHandler(
	ctx: BlockContext,
	event: Event<'XcmPallet.Attempted'>
): Promise<void> {
    ctx.log.info('start indexing XcmPallet.Attempted')
	await logStartProcessingEvent(ctx, event)

  // const type = events.xcmPallet.attempted
	// const data = getEventData(ctx, type, event)
}

export async function messageAcceptedHandler(
	ctx: BlockContext,
	event: Event<'SubstrateBridgeOutboundChannel.MessageAccepted'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  const type = events.substrateBridgeOutboundChannel.messageAccepted
  const data = getEventData(ctx, type, event)

  const networkId = 'networkId' in data ? data.networkId : data[0]
  const batchNonce = 'batchNonce' in data ? data.batchNonce.toString() : null
  const messageNonce = 'messageNonce' in data ? data.messageNonce.toString() : null

	const historyData = {
    networkId: networkId.__kind,
    batchNonce,
    messageNonce
  }

    await createEventHistoryElement(ctx, event, historyData)
}



export async function systemExtrinsicFailedHandler(
	ctx: BlockContext,
	event: Event<'system.ExtrinsicFailed'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  const type = events.system.extrinsicFailed
	const data = getEventData(ctx, type, event)

  const dispatchError = 'dispatchError' in data ? data.dispatchError : data[0]
  const dispatchInfo = 'dispatchInfo' in data ? data.dispatchInfo : data[1]

  const classInfo = dispatchInfo?.class
  const paysFee = dispatchInfo?.paysFee
  const weight = dispatchInfo?.weight

  const proofSize = typeof weight === 'object' ? weight.proofSize.toString() : null
  const refTime = typeof weight === 'object' ? weight.refTime.toString() : null

	const historyData: Record<string, any> = {
    dispatchError,
    classInfo,
    paysFee,
    proofSize,
    refTime
  }

  if (typeof weight !== 'object') historyData.weight = weight.toString()

    await createEventHistoryElement(ctx, event, historyData)
}

export async function systemExtrinsicSuccessHandler(
	ctx: BlockContext,
	event: Event<'system.ExtrinsicSuccess'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  const type = events.system.extrinsicSuccess
	const data = getEventData(ctx, type, event)

  const dispatchInfo = 'dispatchInfo' in data ? data.dispatchInfo : data

  const classInfo = dispatchInfo?.class
  const paysFee = dispatchInfo?.paysFee
  const weight = dispatchInfo?.weight

  const proofSize = typeof weight === 'object' ? weight.proofSize.toString() : null
  const refTime = typeof weight === 'object' ? weight.refTime.toString() : null

	const historyData: Record<string, any> = {
    classInfo,
    paysFee,
    proofSize,
    refTime
  }

  if (typeof weight !== 'object') historyData.weight = weight.toString()

    await createEventHistoryElement(ctx, event, historyData)
}

export async function messageDispatchedHandler(
	ctx: BlockContext,
	event: Event<'SubstrateDispatch.MessageDispatched'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  const type = events.substrateDispatch.messageDispatched
	const data = getEventData(ctx, type, event)

  const messageId = data[0]
  const result = data[1]

  const sender = 'sender' in messageId ? messageId.sender.value : null
  const receiver = 'receiver' in messageId ? messageId.receiver.value : null
  const batchNonce = 'batchNonce' in messageId ? messageId.batchNonce?.toString() ?? null : null
  const messageNonce = 'messageNonce' in messageId ? messageId.messageNonce?.toString() : null
  const direction = 'direction' in messageId ? messageId.direction?.toString() : null

	const historyData: Record<string, any>  = {
    sender,
    receiver,
    batchNonce,
    messageNonce,
    result,
    direction
  }

    await createEventHistoryElement(ctx, event, historyData)
}

export async function requestStatusUpdateHandler(
	ctx: BlockContext,
	event: Event<'BridgeProxy.RequestStatusUpdate'>
): Promise<void> {
	logStartProcessingEvent(ctx, event)

  // const type = events.bridgeProxy.requestStatusUpdate
	// const data = getEventData(ctx, type, event)
}

export async function mintedHandler(
	ctx: BlockContext,
	event: Event<'ParachainBridgeApp.Minted'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  // const type = events.parachainBridgeApp.minted
	// const data = getEventData(ctx, type, event)
}

export async function burnedHandler(
	ctx: BlockContext,
	event: Event<'ParachainBridgeApp.Burned'>
): Promise<void> {
	await logStartProcessingEvent(ctx, event)

  // const type = events.parachainBridgeApp.burned
	// const data = getEventData(ctx, type, event)
}
