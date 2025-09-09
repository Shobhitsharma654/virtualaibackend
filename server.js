import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.router.js"
import authRouter from "./routes/auth.router.js"
import cors from "cors"
import geminiResponse from "./gemini.js"
dotenv.config()

const app= express()
const port = process.env.PORT || 8000


app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://virtualaiassistant-frontend.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth" , authRouter)
 app.use("/api/user" , userRouter)

app.get('/', async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const data = await geminiResponse(prompt);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to generate response." });
  }
});



app.listen(port , ()=>{
    connectDB()
    console.log("Server is started on port 8000")
})


