import { Router } from "express";

import {newRental, deleteRental, finalizeRental, allRentals} from "../controllers/rentalsController.js";
import {validatingRentals, validatingFinalizeAndDeleteRental} from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.post("/rentals", validatingRentals, newRental);
rentalsRouter.post("/rentals/:id/return", validatingFinalizeAndDeleteRental, finalizeRental);
rentalsRouter.get("/rentals", allRentals);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
