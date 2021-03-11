import { client } from '../local'

export async function createWalletTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS wallet (
      id bigserial PRIMARY KEY,
      balance_total decimal NOT NULL DEFAULT 0,
      status boolean NOT NULL DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createWalletTable Success.')
  } catch(e) {
    console.log('[DB] createWalletTable Error: ' + e.message)
    return false
  }
}

export async function dropWalletTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE wallet
  `

  try {
    await client.query(sql)
    console.log('[DB] dropWalletTable Success.')
  } catch(e) {
    console.log('[DB] dropWalletTable Error: ' + e.message)
    return false
  }
}

