import { Client, QueryResult } from 'pg'
const connectionString: string = process.env.PG_CONNSTR || ''

export let client: Client

export default async function init(): Promise<void> {
  try {
    client = new Client({
      connectionString,
    })
    await client.connect()
    console.log('[DB] Connected!')
    await client.query('SELECT NOW()', (err: Error, res: QueryResult<any>) => {
      if(err) {
        console.log('[DB] Error: ' + err)
        return
      }
      console.log('[DB] SELECT NOW(): ' + JSON.stringify(res.rows))
    })
  } catch(e) {
    console.log('[DB] Error: ' + e.message)
  }
}

export async function terminate(): Promise<void> {
  await client.end()
}

