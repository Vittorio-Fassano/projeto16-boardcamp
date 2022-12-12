import { connectionDB } from "../database/db.js";
import { rentalsSchema } from "../models/rentalsSchema.js";

export default async function validatingRentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const { error } = rentalsSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).send(error.details.map((detail) => detail.message));
  }

  try {
    const rentalCustomerId = await connectionDB.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );

    const rentalGameId = await connectionDB.query(
      `SELECT * FROM games WHERE id = $1`,
      [gameId]
    );

    if (!rentalCustomerId.rows[0] || !rentalGameId.rows[0] || daysRented <= 0) {
      return res.sendStatus(400);
    }

  } catch (err) {
    return res.sendStatus(500);
  }

  next();
}
