import express, { Router, Request, Response } from "express"
import { createWallet, getWallet, getWalletAll } from "../db/controllers/wallet"
import HttpResponse from "../utils/http"

const router: Router = express.Router()

/* POST create wallet. */
router.post('/', async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const result: false | any[] = await createWallet()

    if(result !== false) {
      const responseData = result[0]
      res.send(new HttpResponse(200, 'success', responseData))
    } else {
      throw new Error('')
    }
  } catch(e) {
    res.send(new HttpResponse(500, 'Internal Server Error'))
  }
})

/* GET get wallet by id. */
router.get('/:id', async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const { id } = req.params
    if(!id) throw new Error('Input Error')
    const result: false | any[] = await getWallet(id.toString())
    if(result !== false) {
      const responseData = {
        ...result[0],
        balance_total: Number(Number(result[0].balance_total).toFixed(2)),
        transactions: result[0].transactions.map((item: any) => ({
          ...item,
          balance_before: Number(Number(item.balance_before).toFixed(2)),
          balance_after: Number(Number(item.balance_after).toFixed(2)),
          balance_change: Number(Number(item.balance_change).toFixed(2))
        }))
      }
      res.send(new HttpResponse(200, 'success', responseData))
    } else {
      throw new Error('')
    }
  } catch(e) {
    if(e.message === 'Input Error') {
      res.send(new HttpResponse(400, 'Input Error'))
    } else {
      res.send(new HttpResponse(500, 'Internal Server Error'))
    }
  }
})

/* GET get all wallets. */
router.get('/', async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const result: false | any[] = await getWalletAll()
    if(result !== false) {
      const responseData = result.map((item: any) => ({ ...item, balance_total: Number(Number(item.balance_total).toFixed(2))}))
      res.send(new HttpResponse(200, 'success', responseData))
    } else {
      throw new Error('')
    }
  } catch(e) {
    if(e.message === 'Input Error') {
      res.send(new HttpResponse(400, 'Input Error'))
    } else {
      res.send(new HttpResponse(500, 'Internal Server Error'))
    }
  }
})

export default router
