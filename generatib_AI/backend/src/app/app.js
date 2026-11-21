import express from 'express'
import userRouter from "../route/user.router.js"
import cookieParser from "cookie-parser"



const app=express()

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", userRouter)

export default app;