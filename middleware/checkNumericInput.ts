import { Request, Response } from 'express'
import HttpResponse from '../utils/http'

export function checkAllowDecimal(req: Request, res: Response, next: Function) {
  try {
    const { amount } = req.body
    const flag = process.env.NODE_APP_ALLOW_DECIMAL
    if(flag === 'true' || flag === undefined) {
      next()
    } else {
      if(amount.toString().indexOf(".") !== -1) {
        throw new Error('Input Error')
      }
      next()
    }
  } catch(e) {
    res.send(new HttpResponse(401, e.message))
  }
}
