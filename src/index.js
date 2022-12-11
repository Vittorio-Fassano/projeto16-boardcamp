import express from "express";
import cors from "cors";

import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import customersRouter from "./routes/customersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

export default app;