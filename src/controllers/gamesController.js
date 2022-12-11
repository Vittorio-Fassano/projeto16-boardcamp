import { connectionDB } from "../database/db.js";

export default async function newGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connectionDB.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
       VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
