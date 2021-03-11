import e from 'express'
import { client } from '../local'
import { isRowsExist, genDateNow } from '../utils/helpers'
import { getTransactionByWallet } from './transaction'

export async function createWallet(): Promise<Array<any> | false> {
  const sql = `
    INSERT INTO wallet(balance_total, created_at, last_updated)
    VALUES($1, $2, $3)
    RETURNING *
  `
  const now = genDateNow()

  try {
    const { rows } = await client.query(sql, [0, now, now])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] createWallet Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error('Row insertion failed.')
    }
  } catch(e) {
    console.log('[DB] createWallet Error: ' + e.message)
    return false
  }
}

export async function getWalletAll(): Promise<Array<any> | false> {
  const sql = `
    SELECT *
    FROM wallet
  `

  try {
    const { rows } = await client.query(sql)
    if(isRowsExist(rows) && rows) {
      console.log('[DB] getWalletAll Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] getWalletAll Error: ' + e.message)
    return false
  }
}

export async function getWallet(id: string): Promise<Array<any> | false> {
  const sql = `
    SELECT *
    FROM wallet
    WHERE id = $1
  `

  // const sql = `
  //   SELECT wallet.id, wallet.balance_total, wallet.status, wallet.created_at, wallet.last_updated,
  //     (ARRAY_AGG((transaction.balance_after, transaction.balance_before, transaction.balance_change, transaction.direction, transaction.last_updated) ORDER BY transaction.created_at DESC)) as transactions
  //   FROM wallet
  //   LEFT JOIN transaction
  //   ON wallet.id = transaction.wallet_id
  //   WHERE wallet.id = $1
  //   GROUP BY wallet.id
  // `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] getWallet Success: ')
      const transactions = await getTransactionByWallet(id)
      let reformattedRows
      if(transactions instanceof Array) {
        reformattedRows = rows.map((row: any) => {
          return {
            ...row,
            transactions: [...transactions]
          }
        })
      } else {
        throw new Error('getTransaction error')
      }
      console.log(reformattedRows)
      return reformattedRows

      // const formattedRows = rows.map((row: any) => {
      //   const { transactions } = row
      //   const columnsArr: string[] = transactions.split(',')
      //   return {
      //     ...row,
      //     transactions: {
      //       balance_after: columnsArr[0].split('(')[1],
      //       balance_before: columnsArr[1],
      //       balance_change: columnsArr[2],
      //       direction: columnsArr[3] === 't' ? true : false,
      //       last_updated: columnsArr[4]
      //     }
      //   }
      // })
      // console.log(formattedRows)
      // return formattedRows
      } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] getWallet Error: ' + e.message)
    return false
  }
}

export async function deleteWallet(id: string): Promise<Array<any> | false> {
  const sql = `
    DELETE FROM wallet
    WHERE id = $1
    RETURNING *
  `

  try {
    const { rows } = await client.query(sql, [id])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] deleteWallet Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] deleteWallet Error: ' + e.message)
    return false
  }
}

export async function updateWalletBalance(id: string, balanceTotal: number): Promise<Array<any> | false> {
  const sql = `
    UPDATE wallet
    SET balance_total = $2, last_updated = $3
    WHERE id = $1 AND status = true
    RETURNING *
  `
  const now = genDateNow()

  try {
    const { rows } = await client.query(sql, [id, Number(balanceTotal), now])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] updateWalletBalance Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] updateWalletBalance Error: ' + e.message)
    return false
  }
}

export async function updateWalletStatus(id: string, status: boolean): Promise<Array<any> | false> {
  const sql = `
    UPDATE wallet
    SET status = $2, last_updated = $3
    WHERE id = $1
    RETURNING *
  `
  const now = genDateNow()

  try {
    const { rows } = await client.query(sql, [id, status, now])
    if(isRowsExist(rows) && rows) {
      console.log('[DB] updateWalletStatus Success: ')
      console.log(rows)
      return rows
    } else {
      throw new Error(`Query: ${sql} failed.`)
    }
  } catch(e) {
    console.log('[DB] updateWalletStatus Error: ' + e.message)
    return false
  }
}
