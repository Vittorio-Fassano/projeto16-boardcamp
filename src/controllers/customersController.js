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
      const customers = await connectionDB.query(`SELECT * FROM customers;`);
      res.send(customers.rows);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function customerById(req, res) {
  const { id } = req.params;

  try {
    const customer = await connectionDB.query(
      `SELECT * FROM customers
           WHERE id = $1 ;`,
      [id]
    );

    if (id) {
      return res.status(200).send(customer.rows);
    }

    if (!customer.rows[0]) {
      return res.sendStatus(404);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
