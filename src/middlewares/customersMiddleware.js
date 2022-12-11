import { connectionDB } from "../database/db.js";
import { customersSchema } from "../models/customersSchema.js";

export default async function validatingCustomers(req, res, next) {
  const { cpf } = req.body;
  const { error } = customersSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((detail) => detail.message));
  }

  try {
    const cpfAlreadyExist = await connectionDB.query(
      `SELECT * FROM customers WHERE cpf = $1`,
      [cpf]
    );
    if (cpfAlreadyExist.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}
