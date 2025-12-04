import express from 'express'
import { createCurrentUser, updateUser } from '../controllers/authController.ts'
import { jwtCheck, parseJwt } from '../middleware/auth.ts'
import { validateMyRequest } from '../middleware/validation.ts'

const authRouter = express.Router()

authRouter.post("/my/user", jwtCheck, createCurrentUser)
authRouter.put("/my/user", jwtCheck, parseJwt, validateMyRequest, updateUser)


export default authRouter