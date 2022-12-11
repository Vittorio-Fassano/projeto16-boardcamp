import { Router } from "express";

import {newCategory, allCategories} from "../controllers/categoriesController.js";
import validatingCategories from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();
categoriesRouter.post("/categories", validatingCategories, newCategory);
categoriesRouter.get("/categories", allCategories);

export default categoriesRouter;