import express from 'express'
import { createCurrentUser } from '../controllers/authController.ts'

const authRouter = express.Router()

authRouter.post("/my/user", createCurrentUser)


export default authRouter