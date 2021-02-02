import { Request, Response } from 'express'
import HttpResponse from '../utils/http'
// import { decodeJWT } from '../utils/jwt'

function authenticate(token: string): boolean {
  // TODO: implement

  // console.log(decodeJWT(token, 'qapi'))
  // return decodeJWT(token, 'qapi')
  return true
}

export default function authMiddleware(req: Request, res: Response, next: Function): void {
  try {
    const token: string | undefined = req.headers.authorization
    if(token) {
      const authenticateTokenResult: boolean = authenticate(token)
      if(authenticateTokenResult === true) {
        next()
      } else {
        throw new Error('forbidden')
      }
    } else {
      throw new Error('forbidden')
    }
  } catch(e) {
    res.send(new HttpResponse(401, e.message))
  }
}
