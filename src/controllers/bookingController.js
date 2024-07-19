import carModal from '../models/carModel.js'
import bookingModal from '../models/bookingModel.js'


export const bookCar = async (req, res) => {

    try {
        let { Name, phoneNo, email, carId, startDate, endDate } = req.body;

        if (!carId || !phoneNo || !Name || !email || !startDate || !endDate) {
            return res.status(400).json({ success: false, message: "invalid input" })
        }

        let start = new Date(startDate)
        let end = new Date(endDate)

        if (start > end) {
            return res.status(400).json({ error: 'End date must be after start date' });
        }

        const differenceInTime = end - start;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        let car = await carModal.findOne({ _id: carId, booked: false })

        if (!car) {

            return res.status(404).json({ success: false, message: "car not found" })
        }

        let Total = (car.price * differenceInDays)

        const newBooking = await bookingModal.create({
            Name,
            phoneNo,
            email,
            carId,
            startDate,
            endDate,
            total: Total
        })

        const savedBooking = await newBooking.save()

        if (!savedBooking) {

            return res.status(500).json({ success: false, message: "server error", error })
        }

        await carModal.findByIdAndUpdate(carId, { booked: true })

        return res.status(201).json({ success: true, message: "car booked successfully", Total })

    } catch (error) {

        return res.status(500).json({ success: false, message: "server error", error })
    }
}

export const cancelBoooking = async (req, res) => {

    try {
        let { bookingId } = req.body

        if (!bookingId) {

            return res.status(401).json({ success: false, message: "invalid field" })
        }

        let bookingExist = await bookingModal.findById(bookingId)

        if (!bookingExist || bookingExist.length == 0) {

            return res.status(404).json({ success: false, message: "booking not found" })
        }

        let carId = bookingExist.carId

        let cancelBooking = await bookingModal.findByIdAndDelete(bookingId)

        if (!cancelBooking) {

            return res.status(401).json({ success: false, message: "error while canceling booking try again after some time" })
        }

        carId = carId.toString()

        const updatedCar = await carModal.findByIdAndUpdate(carId, { booked: false }, { new: true })

        if (!updatedCar) {
            return res.status(500).json({ success: false, message: "Server error" })
        }

        return res.status(201).json({ success: true, message: "booking canceld successfully" })

    } catch (error) {

        return res.status(500).json({ success: false, message: "server error", error })
    }
}

export const showAllBooking = async (req, res) => {
    try {

        let email = req.body

        if (!email) {

            return res.status(401).json({ success: false, message: "email is required" })
        }

        const bookings = await bookingModal.find(email)

        if (!bookings || bookings.length == 0) {
            return res.json({ success: false, message: "booking not found" })
        }

        let carId = []

        for (let i = 0; i < bookings.length; i++) {
            carId.push(bookings[i].carId)
        }
        carId = carId.toString().split(",")

        let carImages = []

        for (let j = 0; j < carId.length; j++) {
            let car = await carModal.findById(carId[j])
            carImages.push(car.carImage)
        }

        return res.status(201).json({ success: true, message: "booking feached successfully", bookings, carImages })

    } catch (error) {

        return res.status(500).json({ success: false, message: "server error", error })
    }
}

