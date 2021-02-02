import express, { Router, Request, Response } from "express"
import HttpResponse from "../utils/http"
const router: Router = express.Router()

/* GET server health. */
router.get('/health', function(req: Request, res: Response, next: Function): void {
  res.send(new HttpResponse(200, 'success'))
})

export default router
