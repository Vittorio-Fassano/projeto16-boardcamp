import { Router } from "express";

import {newGame, allGames} from "../controllers/gamesController.js";
import validatingGames from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();
gamesRouter.post("/games", validatingGames, newGame);
gamesRouter.get("/games", allGames);

export default gamesRouter;
