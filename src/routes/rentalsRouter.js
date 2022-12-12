import { Router } from "express";

import newRental from "../controllers/rentalsController.js";
import validatingRentals from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.post("/rentals", validatingRentals, newRental);

export default rentalsRouter;