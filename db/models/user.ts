import { client } from '../local'

export async function createUserTable(): Promise<void | false> {
  const sql: string = `
    CREATE TABLE IF NOT EXISTS cmsUsers (
      id serial PRIMARY KEY,
      email text NOT NULL,
      password text NOT NULL,
      access_token text NOT NULL,
      refresh_token text NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  try {
    await client.query(sql)
    console.log('[DB] createUserTable Success.')
  } catch(e) {
    console.log('[DB] createUserTable Error: ' + e.message)
    return false
  }
}

export async function dropUserTable(): Promise<void | false> {
  const sql: string = `
    DROP TABLE cmsUsers
  `

  try {
    await client.query(sql)
    console.log('[DB] dropUserTable Success.')
  } catch(e) {
    console.log('[DB] dropUserTable Error: ' + e.message)
    return false
  }
}

