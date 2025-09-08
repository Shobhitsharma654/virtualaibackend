import express from "express"
import { logout, signIn, signUp } from "../controller/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin" , signIn)
authRouter.get("/logout" , logout)


export default authRouter