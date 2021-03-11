import express, { Router, Request, Response } from "express"
import { checkAllowDecimal } from "../middleware/checkNumericInput"
import { createTransaction, getTransaction, getTransactionAll } from "../db/controllers/transaction"
import { getWallet } from "../db/controllers/wallet"
import HttpResponse from "../utils/http"

const router: Router = express.Router()

/* POST create transaction. */
router.post('/', checkAllowDecimal, async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const { id, amount, direction }: { id: string, amount: number, direction: boolean } = req.body

    if(isNaN(Number(amount)) || typeof amount !== 'number') {
      throw new Error('Input Error')
    }
    const walletResult: false | any[] = await getWallet(id)
    if(walletResult !== false) {
      const wallet = walletResult[0]
      const transactionResult: false | any[] = await createTransaction(wallet.id, Number(wallet.balance_total), Number(amount), direction)
      if(transactionResult !== false) {
        const responseData = {
          ...transactionResult[0],
          balance_before: Number(Number(transactionResult[0].balance_before).toFixed(2)),
          balance_after: Number(Number(transactionResult[0].balance_after).toFixed(2)),
          balance_change: Number(Number(transactionResult[0].balance_change).toFixed(2))
        }
        res.send(new HttpResponse(200, 'success', responseData))
      }
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

/* GET get transaction by id. */
router.get('/:id', async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const { id } = req.params
    if(!id) throw new Error('Input Error')

    const result: false | any[] = await getTransaction(id.toString())
    if(result !== false) {
      const responseData = {
        ...result[0],
        balance_before: Number(Number(result[0].balance_before).toFixed(2)),
        balance_after: Number(Number(result[0].balance_after).toFixed(2)),
        balance_change: Number(Number(result[0].balance_change).toFixed(2))
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

/* GET get all transactions. */
router.get('/', async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const result: false | any[] = await getTransactionAll()
    if(result !== false) {
      const responseData = result.map((item: any) => ({
          ...item,
          balance_before: Number(Number(item.balance_before).toFixed(2)),
          balance_after: Number(Number(item.balance_after).toFixed(2)),
          balance_change: Number(Number(item.balance_change).toFixed(2))
        }))
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
