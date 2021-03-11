import { client } from '../local'
import { isRowsExist, genDateNow } from '../utils/helpers'
import { Wallet } from '../../utils/wallet'
import { updateWalletBalance } from './wallet'

export async function createTransaction(walletId: string, balanceBefore: number, balanceChange: number, direction: boolean): Promise<Array<any> | false> {
  const sql = `
    INSERT INTO transaction(wallet_id, balance_before, balance_after, balance_change, direction, created_at, last_updated)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `
  const now = genDateNow()
  const balanceBeforeToNumber = Number(balanceBefore)
  const balanceChangeToNumber = Number(balanceChange)

  if(!isNaN(balanceBeforeToNumber) && !isNaN(balanceChangeToNumber)) {
    const balanceAfter = direction === true ? balanceBefore + balanceChange : balanceBefore - balanceChange
    try {
      const { rows } = await client.query(sql, [walletId, balanceBefore, balanceAfter, balanceChange, direction, now, now])
      if(isRowsExist(rows) && rows) {
        await updateWalletBalance(walletId, balanceAfter)
        console.log('[DB] createTransaction Success: ')
        console.log(rows)
        return rows
      } else {
        throw new Error(`Query: ${sql} failed.`)
      }
    } catch(e) {
      console.log('[DB] createTransaction Error: ' + e.message)
      return false
    }
  } else {
    return false
  }
}

export async function getTransactionAll(): Promise<Array<Wallet.Wallet> | false> {
  const sql = `
    SELECT *
    FROM transaction
  `

  try {
    const { rows } = await client.query(sql)
    if(isRowsExist(rows) && rows) {
      console.log('[DB] getTransactionAll Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] getTransactionAll Error: ' + e.message)
    return false
  }
}

export async function getTransaction(id: string): Promise<Array<Wallet.Wallet> | false> {
  const sql = `
    SELECT *
    FROM transaction
    WHERE id = $1
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] getTransaction Success: ')
      console.log(rows)
      return rows
    } else if(rows && rows.length === 0) {
      return []
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] getTransaction Error: ' + e.message)
    return false
  }
}

export async function getTransactionByWallet(walletId: string): Promise<Array<Wallet.Wallet> | false> {
  const sql = `
    SELECT *
    FROM transaction
    WHERE wallet_id = $1
  `

  try {
    const { rows } = await client.query(sql, [walletId])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] getTransaction Success: ')
      console.log(rows)
      return rows
    } else if(rows && rows.length === 0) {
      return []
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] getTransaction Error: ' + e.message)
    return false
  }
}

export async function deleteTransaction(id: string): Promise<Array<Wallet.Wallet> | false> {
  const sql = `
    DELETE FROM transaction
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] deleteTransaction Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] deleteTransaction Error: ' + e.message)
    return false
  }
}
