import { connectionDB } from "../database/db.js";

export default async function newCostumer(req, res) {
  const { name, phone, cpf, birthday} = req.body;

  try {
    await connectionDB.query(
      `INSERT INTO customers (name, phone, cpf, birthday) 
       VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

