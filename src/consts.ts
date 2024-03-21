import { FieldSelection } from "@subsquid/substrate-processor"

export const callNames = [
	'Assets.register',
	'Assets.transfer',
	'LiquidityProxy.xorless_transfer',
	'LiquidityProxy.swap',
	'LiquidityProxy.swap_transfer',
	'LiquidityProxy.swap_transfer_batch',
	'PoolXYK.deposit_liquidity',
	'PoolXYK.withdraw_liquidity',
	'IrohaMigration.migrate',
	'Utility.batch_all',
	'EthBridge.transfer_to_sidechain',
	'PswapDistribution.claim_incentive',
	'Rewards.claim',
	'VestedRewards.claim_rewards',
	'VestedRewards.claim_crowdloan_rewards',
	'Referrals.set_referrer',
	'Referrals.reserve',
	'Referrals.unreserve',
	'DemeterFarmingPlatform.deposit',
	'DemeterFarmingPlatform.withdraw',
	'DemeterFarmingPlatform.get_rewards',
	'BridgeMultisig.as_multi',
	'BridgeMultisig.as_multi_threshold_1',
	'Staking.bond',
	'Staking.bond_extra',
	'Staking.cancel_deferred_slash',
	'Staking.chill',
	'Staking.chill_other',
	'Staking.force_apply_min_commission',
	'Staking.force_new_era',
	'Staking.force_new_era_always',
	'Staking.force_no_eras',
	'Staking.force_unstake',
	'Staking.increase_validator_count',
	'Staking.kick',
	'Staking.nominate',
	'Staking.payout_stakers',
	'Staking.reap_stash',
	'Staking.rebond',
	'Staking.scale_validator_count',
	'Staking.set_controller',
	'Staking.set_history_depth',
	'Staking.set_invulnerables',
	'Staking.set_min_commission',
	'Staking.set_staking_configs',
	'Staking.set_validator_count',
	'Staking.set_payee',
	'Staking.submit_election_solution',
	'Staking.submit_election_solution_unsigned',
	'Staking.unbond',
	'Staking.validate',
	'Staking.withdraw_unbonded',
	'OrderBook.place_limit_order',
	'OrderBook.cancel_limit_order',
	'OrderBook.cancel_limit_orders_batch',
	'Band.relay'
] as const

export const eventNames = [
	'EthBridge.IncomingRequestFinalized',
	'EthBridge.IncomingRequestFinalizationFailed',
	'EthBridge.RequestRegistered',
	'Tokens.Deposited',
	'Tokens.Withdrawn',
	'Tokens.Transfer',
	'TransactionPayment.TransactionFeePaid',
	'Balances.Deposit',
	'Balances.Deposited',
	'Balances.Withdraw',
	'Balances.Transfer',
	'Currencies.Transferred',
	'Currencies.Deposited',
	'XorFee.FeeWithdrawn',
	'XorFee.ReferrerRewarded',
	'Assets.AssetRegistered',
	'Assets.Transfer',
	'LiquidityProxy.Exchange',
	'LiquidityProxy.BatchSwapExecuted',
	'DemeterFarmingPlatform.Deposited',
	'DemeterFarmingPlatform.RewardWithdrawn',
	'DemeterFarmingPlatform.Withdrawn',
	'XSTPool.SyntheticAssetEnabled',
	'Band.SymbolsRelayed',
	'Staking.Rewarded',
	'Staking.StakersElected',
	'Staking.PayoutStarted',
	'OrderBook.OrderBookCreated',
	'OrderBook.OrderBookStatusChanged',
	'OrderBook.LimitOrderPlaced',
	'OrderBook.LimitOrderExecuted',
	'OrderBook.LimitOrderUpdated',
	'OrderBook.LimitOrderFilled',
	'OrderBook.LimitOrderCanceled',
	'OrderBook.MarketOrderExecuted',
	'OrderBook.LimitOrderConvertedToMarketOrder',
	'OrderBook.LimitOrderIsSplitIntoMarketOrderAndLimitOrder',
	'XcmPallet.Attempted',
	'SubstrateBridgeOutboundChannel.MessageAccepted',
	'SubstrateDispatch.MessageDispatched',
	'BridgeProxy.RequestStatusUpdate',
	'ParachainBridgeApp.Minted',
	'ParachainBridgeApp.Burned',
	'system.ExtrinsicSuccess',
	'system.ExtrinsicFailed'


] as const

export const versionsWithStringAssetId = ['1', '1Stage', '1Test', '2', '2Stage', '2Test', '3', '3Stage', '3Test', '4', '4Stage', '4Test', '5', '5Stage', '5Test', '6', '6Stage', '6Test', '7', '7Stage', '7Test', '8', '8Stage', '8Test', '9', '9Stage', '9Test', '10', '10Stage', '10Test', '11', '11Stage', '11Test', '12', '12Stage', '12Test', '13', '13Stage', '13Test', '14', '14Stage', '14Test', '15', '15Stage', '15Test', '16', '16Stage', '16Test', '17', '17Stage', '17Test', '18', '18Stage', '18Test', '19', '19Stage', '19Test', '20', '20Stage', '20Test', '21', '21Stage', '21Test', '22', '22Stage', '22Test', '23', '23Stage', '23Test', '24', '24Stage', '24Test', '25', '25Stage', '25Test', '26', '26Stage', '26Test', '27', '27Stage', '27Test', '28', '28Stage', '28Test', '29', '29Stage', '29Test', '30', '30Stage', '30Test', '31', '31Stage', '31Test', '32', '32Stage', '32Test', '33', '33Stage', '33Test'] as const