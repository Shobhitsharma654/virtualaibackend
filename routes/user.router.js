import express from "express"
import {  askToAssistant, getCurrentUser, updateAssistant } from "../controller/user.controller.js"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.get("/currentuser",isAuth, getCurrentUser)
userRouter.post("/update", isAuth, upload.single("assistantImage"),updateAssistant)
userRouter.post("/asktoassistant" , isAuth, askToAssistant)



export default userRouter