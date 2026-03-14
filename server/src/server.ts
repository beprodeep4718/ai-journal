import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import rateLimit from "express-rate-limit"

import journalRoutes from "./routes/journal.routes"

import { connectDB } from "./config/db"
import { connectRedis } from "./config/redis"


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
const analyzeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many analysis requests. Please try again later."
})
app.use("/api/journal/analyze", analyzeLimiter)
app.use("/api/journal", journalRoutes)

connectDB()
connectRedis()

app.listen(PORT, () => {
 console.log("Server running on port 5000")
})