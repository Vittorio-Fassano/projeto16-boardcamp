import { Router } from "express";

import {newRental, deleteRental, finalizeRent} from "../controllers/rentalsController.js";
import validatingRentals /*, validatingFinalizeRent*/ from "../middlewares/rentalsMiddleware.js";

const rentalsRouter = Router();
rentalsRouter.post("/rentals", validatingRentals, newRental);
rentalsRouter.delete("/rentals/:id", deleteRental);
rentalsRouter.post("/rentals/:id/return", /*validatingFinalizeRent,*/ finalizeRent);

export default rentalsRouter;
