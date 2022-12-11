import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./routes/categoriesRouter.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use(categoriesRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));