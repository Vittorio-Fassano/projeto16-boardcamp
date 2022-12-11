import { Router } from "express";

import {newCategory, allCategories} from "../controllers/categoriesController.js";
const categoriesRouter = Router();

categoriesRouter.post("/categories", newCategory);
categoriesRouter.get("/categories", allCategories);

export default categoriesRouter;