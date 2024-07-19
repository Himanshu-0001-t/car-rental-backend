import mongoose from "mongoose";

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        mongoose.connection.on("connect", () => {
            console.log("Connected successfully")
        })

        mongoose.connection.on("error", () => {
            console.log("connection error")
        })

    } catch (error) {

        console.log("Mongodb connection Error", error)
        process.exit(1)
    }
}

export default connectDB