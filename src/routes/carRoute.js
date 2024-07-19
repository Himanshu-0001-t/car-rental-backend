import express from "express"
import { createCar, deleteCar, filter, getSingleCar, updateCar } from "../controllers/carController.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/", upload.single('Image'), createCar)
router.get("/", filter)
router.get("/:id", getSingleCar)
router.patch("/u/:id", updateCar)
router.delete("/d/:id", deleteCar)

export default router