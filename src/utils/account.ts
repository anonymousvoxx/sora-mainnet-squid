import { Account } from '../model'
import { Address, BlockContext } from '../types'
import { getUtilsLog } from './logs'

import { networkSnapshotsStorage } from './network'

export const getAccountEntity = async (ctx: BlockContext, accountAddress: Address) => {
	let account = await ctx.store.get(Account, accountAddress)

	if (account) {
		getUtilsLog(ctx).debug({ address: accountAddress }, 'Account found in store')
	} else {
		account = new Account()
		account.id = accountAddress
		account.updatedAtBlock = ctx.block.header.height
		await ctx.store.save(account)
		getUtilsLog(ctx).debug({ address: accountAddress }, 'Account created')
		await networkSnapshotsStorage.updateAccountsStats(ctx)
	}

	return account
}
