import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    total: {
        type: Number
    }

}, { timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking