import { connectionDB } from "../database/db.js";
import { gamesSchema } from "../models/gamesSchema.js";

export default async function validatingGames(req, res, next) {
  const { name, categoryId } = req.body;
  const { error } = gamesSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((detail) => detail.message));
  }

  try {
    const nameAlreadyExist = await connectionDB.query(
      `SELECT * FROM games WHERE name = $1`,
      [name]
    );
    const categoryIdValidate = await connectionDB.query(
      `SELECT * FROM categories WHERE id = $1`,
      [categoryId]
    );

    if (nameAlreadyExist.rows[0]) {
      return res.sendStatus(409);
    }
    if (!categoryIdValidate.rows[0]) {
      return res.sendStatus(400);
    }

    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
