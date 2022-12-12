import { Router } from "express";

import {newRental, deleteRental} from "../controllers/rentalsController.js";
import validatingRentals from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.post("/rentals", validatingRentals, newRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
