import carModel from "../models/carModel.js"
import { uploadOnCloudinary } from "../helper/cloudinary.js"

export const createCar = async (req, res) => {
    try {
        let { carType, carColor, carName, fuel, transmission, price, stock, brand, seat } = req.body

        if (!carType || !carColor || !carName || !fuel || !transmission || !price || !stock || !brand || !seat) {
            return res.status(400).json({ success: false, message: "all fields are required" })
        }

        const localfilepath = req.file.path

        if (!localfilepath) {
            return res.json({ message: "Image is required", success: false })
        }

        const carImageURL = await uploadOnCloudinary(localfilepath)

        if (!carImageURL) {

            return res.status(401).json({ success: false, message: "image uploding fail" })
        }

        const newCar = await carModel.create({
            carType,
            carColor,
            carName,
            fuel,
            transmission,
            price,
            stock,
            brand,
            carImage: carImageURL,
            seat
        })

        const saved = await newCar.save()

        if (!saved) {

            return res.json({ success: false, message: "error on car saving" })
        }

        return res.status(201).json({ success: true, message: "Car created successfully" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server Error", error })
    }
}

export const updateCar = async (req, res) => {
    try {
        let carId = req.params.id

        if (!carId) {
            return res.status(204).json({ success: false, message: "Car id is required" })
        }

        const updatedCar = await carModel.findByIdAndUpdate(carId, { $set: req.body })

        if (!updatedCar) {
            return res.status(500).json({ success: false, message: " server error" })
        }

        return res.status(201).json({ success: true, message: "Car updated sucessfully" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error })
    }
}

export const getSingleCar = async (req, res) => {

    try {
        let carId = req.params.id

        let car = await carModel.findById(carId)

        if (!car || car.length == 0) {
            return res.status(401).json({ success: false, message: "car not found" })
        }

        return res.status(201).json({ success: true, message: "car found", car })

    } catch (error) {

        return res.status(500).json({ success: false, message: "server error", error })
    }
}

export const filter = async (req, res) => {

    try {
        let query = {
            booked: false
        }
        let limit = 0;

        if (req.query.limit) {
            limit = parseInt(req.query.limit)
        }

        if (req.query.page) {
            query.page = parseInt(req.query.page)
        }

        if (req.query.fuel) {
            query.fuel = req.query.fuel.toUpperCase()
        }

        if (req.query.price) {
            query.price = { $lte: parseInt(req.query.price) }
        }

        if (req.query.transmission) {
            query.transmission = req.query.transmission.toUpperCase()
        }

        if (req.query.type) {
            query.carType = req.query.type
        }

        if (req.query.carColor) {
            query.carColor = req.query.carColor
        }

        if (req.query.brand) {
            query.brand = req.query.brand
        }

        let cars = await carModel.find(query).limit(limit)

        if (!cars || cars.length == 0) {
            return res.json({ success: false, message: "Car not available" })
        }

        let total = cars.length
        return res.status(200).json({ success: true, message: "cars feached successfully", total: total, cars })

    } catch (error) {

        return res.status(500).json({ success: false, message: "Server error", error })
    }

}

export const deleteCar = async (req, res) => {

    try {
        let id = req.params.id

        let deletedCar = await carModel.findByIdAndDelete(id)

        if (!deletedCar) {
            return res.status(404).json({ success: false, message: "car not found" })
        }

        return res.status(201).json({ success: true, message: "car deleted successfully" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "server error", error })
    }
}