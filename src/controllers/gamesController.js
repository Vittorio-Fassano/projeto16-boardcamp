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


//incomplete (incomplete, need to search by name with case insensitive)
export async function allGames(req, res) {
    // const { name } = req.query;
  
    //get all (without name)
    try {
      const games = await connectionDB.query(
        `SELECT games.*, categories.name AS "categoryName"
         FROM games
         JOIN categories
         ON games."categoryId" = categories.id;`
      );
      res.send(games.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }