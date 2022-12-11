import { connectionDB } from "../database/db.js";
import { categoriesSchema } from "../models/categoriesSchema.js";

export default async function validatingCategories(req, res, next) {
  const { name } = req.body;
  const { error } = categoriesSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((detail) => detail.message));
  }

  try {
    const nameAlreadyExist = await connectionDB.query(
      `SELECT * FROM categories WHERE name = $1`,
      [name]
    );
    if (nameAlreadyExist.rows[0]) {
      res.sendStatus(409);
      return;
    }
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
