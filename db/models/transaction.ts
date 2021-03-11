import { client } from '../local'

export async function createTransactionTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS transaction (
      id bigserial PRIMARY KEY,
      wallet_id bigserial,
      balance_before text NOT NULL,
      balance_after text NOT NULL,
      balance_change text NOT NULL,
      direction boolean NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_wallet
        FOREIGN KEY(wallet_id)
	        REFERENCES wallet(id)
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createTransactionTable Success.')
  } catch(e) {
    console.log('[DB] createTransactionTable Error: ' + e.message)
    return false
  }
}

export async function dropTransactionTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE transaction
  `

  try {
    await client.query(sql)
    console.log('[DB] dropTransactionTable Success.')
  } catch(e) {
    console.log('[DB] dropTransactionTable Error: ' + e.message)
    return false
  }
}

