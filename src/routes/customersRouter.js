import { Router } from "express";

import {newCustomer, allCustomers /*,updateCustomers*/} from "../controllers/customersController.js";
import validatingCustomers from "../middlewares/customersMiddleware.js";

const customersRouter = Router();
customersRouter.post("/customers", validatingCustomers, newCustomer);
customersRouter.get("/customers", allCustomers);
// customersRouter.get("/customers", allCustomers);
// customersRouter.put("/customers", updateCustomers);


export default customersRouter;