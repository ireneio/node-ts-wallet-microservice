import { createWalletTable, dropWalletTable } from '../models/wallet'
import { createWallet, getWallet, getWalletAll, updateWalletBalance } from '../controllers/wallet'
import { createTransactionTable, dropTransactionTable } from '../models/transaction'
import init from '../local'
import { createTransaction, deleteTransaction } from '../controllers/transaction'

await init()


// await dropWalletTable()
// await dropTransactionTable()

// await createWalletTable()
// await createTransactionTable()

// await createWallet()
// await createTransaction('1', 10.5, 10.5, true)
// await updateWalletBalance('1', 21.0)
await getWallet('1')
// await getWalletAll()

// await deleteTransaction('2')

process.exit(0)
