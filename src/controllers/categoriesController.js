import { connectionDB } from "../database/db.js";

export default async function newCategory(req, res) {
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
