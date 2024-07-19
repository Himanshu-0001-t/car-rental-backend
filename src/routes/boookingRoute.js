import express from "express"
import { bookCar, cancelBoooking, showAllBooking } from "../controllers/bookingController.js"

const router = express.Router()

router.post("/book", bookCar)
router.post("/cancel", cancelBoooking)
router.post("/show", showAllBooking)

export default router