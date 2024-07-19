import mongoose from "mongoose";

const carSchema = new mongoose.Schema({

    carType: {
        type: String,
        required: true,
        trim: true
    },
    carColor: {
        type: String,
        required: true,
        trim: true
    },
    carName: {
        type: String,
        required: true,
        trim: true
    },
    fuel: {
        type: String,
        enum: ["DIESEL", "PETROL", "CNG"],
        required: true,
        trim: true
    },
    transmission: {
        type: String,
        enum: ["AUTOMATIC", "MANUAL"],
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    booked: {
        type: Boolean,
        default: false,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true
    }

})

const Car = mongoose.model("Car", carSchema)

export default Car