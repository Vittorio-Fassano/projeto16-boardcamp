import { connectionDB } from "../database/db.js";

export async function newCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

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

export async function allCustomers(req, res) {
  const { cpf } = req.query;

  try {
    if (cpf) {
      const customers = await connectionDB.query(
        `SELECT * FROM customers
         WHERE cpf LIKE $1 ;`,
        [`${cpf}%`]
      );
      res.send(customers.rows);
    } else {
      const customers = await connectionDB.query(
        `SELECT * FROM customers;`
      );
      res.send(customers.rows);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
