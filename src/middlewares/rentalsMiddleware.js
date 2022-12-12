import { connectionDB } from "../database/db.js";
import { rentalsSchema } from "../models/rentalsSchema.js";

export async function validatingRentals(req, res, next) {
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

    const rentals = await connectionDB.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [gameId]
    );
    
    const gameFree = rentals.rows.filter(
      rental => rental.returnDate === null
    );
    console.log(gameFree);

    if (
      !rentalCustomerId.rows[0] ||
      !rentalGameId.rows[0] ||
      daysRented <= 0 ||
      gameFree.length >= rentalGameId.rows[0].stockTotal 
    ) {
      return res.sendStatus(400);
    }

    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function validatingFinalizeAndDeleteRental (req, res, next) {
  const {id} = req.params;
  try {
    const rentals = await connectionDB.query(
      `SELECT * FROM rentals
       WHERE id = $1;`,
       [id]
    );

    /*the condition below is checking if the rent is already finished, that is, 
    if the returnDate is already filled*/
    if(rentals.rows[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    if(!rentals) {
      return res.sendStatus(404);
    }

    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
