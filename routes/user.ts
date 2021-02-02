import express, { Router, Request, Response } from 'express'
import { getUser, getUserAll, updateUser } from '../db/controllers/user'
import HttpResponse from '../utils/http'
import { SqlSchema } from '../types/sql'
import authMiddleware from '../middleware/auth'

const router: Router = express.Router()

/* GET all users. */
router.get('/', authMiddleware, async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const getUserAllResult = await getUserAll()
    if(getUserAllResult === false) {
      throw new Error('not found')
    } else {
      res.send(new HttpResponse(200, 'success', getUserAllResult))
    }
  } catch(e) {
    res.send(new HttpResponse(404, e.message))
  }
})

/* PUT update user. */
router.put('/:id', authMiddleware, async function(req: Request, res: Response, next: Function): Promise<void> {
  try {
    const { type } = req.query
    const { id } = req.params
    const { email, password } = req.body

    if(type === 'email') {
      const checkIfUserExists: false | SqlSchema.UserInput[] = await getUser(email)
      if(checkIfUserExists !== false) {
        throw new Error('email already exists')
      }
    } else if(type !== 'password' && type !== 'email') {
        throw new Error('credentials error')
    }

    const updateUserResult: false | SqlSchema.UserInput[] = await updateUser(Number(id), type, type === 'password' ? password : type === 'email' ? email : null)
    if(updateUserResult === false) {
      throw new Error('err')
    } else {
      res.send(new HttpResponse(200, 'success', updateUserResult))
    }
  } catch(e) {
    res.send(new HttpResponse(400, e.message))
  }
})

export default router
