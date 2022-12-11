import { connectionDB } from "../database/db.js";

export async function newGame(req, res) {
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

export async function allGames(req, res) {
  const { name } = req.query;

  try {
    if (name) {
      const nameQuery = name.toLowerCase();
      const games = await connectionDB.query(
        `SELECT games.*, categories.name AS "categoryName"
         FROM games
         JOIN categories
         ON games."categoryId" = categories.id
         WHERE (games.name LIKE $1 OR games.name LIKE $2)
         ORDER BY id DESC;`,
        [`${name}%`, `${nameQuery}%`]
      );
      res.send(games.rows);
    } else {
      const games = await connectionDB.query(
        `SELECT games.*, categories.name AS "categoryName"
         FROM games
         JOIN categories
         ON games."categoryId" = categories.id
         ORDER BY id DESC;`
      );
      res.send(games.rows);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
