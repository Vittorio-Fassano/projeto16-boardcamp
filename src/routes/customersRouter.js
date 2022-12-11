import { Router } from "express";

import {newCustomer, allCustomers, customerById, updateCustomer} from "../controllers/customersController.js";
import validatingCustomers from "../middlewares/customersMiddleware.js";

const customersRouter = Router();
customersRouter.post("/customers", validatingCustomers, newCustomer);
customersRouter.get("/customers", allCustomers);
customersRouter.get("/customers/:id", customerById);
customersRouter.put("/customers/:id", validatingCustomers, updateCustomer);


export default customersRouter;