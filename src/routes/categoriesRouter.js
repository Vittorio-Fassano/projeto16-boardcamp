import { Router } from "express";

import newCategory from "../controllers/categoriesController.js";
const categoriesRouter = Router();

// categoriesRouter.get("/categories", allCategories);
categoriesRouter.post("/categories", newCategory);

export default categoriesRouter;