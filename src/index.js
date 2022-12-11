import express from "express";
import dotenv from "dotenv";
dotenv.config();

import categoriesRouter from "./routes/categoriesRouter.js";

const app = express();
app.use(express.json());

app.use(categoriesRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));