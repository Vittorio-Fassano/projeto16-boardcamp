import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./routes/categoriesRouter.js";
import gamesRouter from "./routes/gamesRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use(categoriesRouter);
app.use(gamesRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port ${port}`));