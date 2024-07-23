import express from "express"
import carRoutes from "./src/routes/carRoute.js"
import bookingRoute from "./src/routes/boookingRoute.js"
import connectDB from "./db.js"
import cors from "cors"
import dotenv from "dotenv";

const app = express()

dotenv.config();


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors())


app.use("/api/car", carRoutes)
app.use("/api/", bookingRoute)


app.get("/", (req, res) => {
    return res.send("hello world")
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => { console.log("server running") })
})

