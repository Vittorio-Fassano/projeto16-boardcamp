import { connectionDB } from "../database/db.js";

export async function newCategory(req, res) {
  const { name } = req.body;

  try {
    await connectionDB.query(
     "INSERT INTO categories (name) VALUES ($1);", 
      [name]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function allCategories(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM categories;");
    res.send(rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
