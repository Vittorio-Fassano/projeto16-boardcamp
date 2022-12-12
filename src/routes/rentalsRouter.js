import { Router } from "express";

import {newRental, deleteRental, finalizeRental} from "../controllers/rentalsController.js";
import validatingRentals /*, validatingFinalizeAndDeleteRental*/ from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.post("/rentals", validatingRentals, newRental);
rentalsRouter.delete("/rentals/:id", deleteRental);
rentalsRouter.post("/rentals/:id/return", finalizeRental);

export default rentalsRouter;
