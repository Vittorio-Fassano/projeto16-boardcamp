import dayjs from "dayjs";

import { connectionDB } from "../database/db.js";

export async function newRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const rentDate = dayjs(Date.Now).format("YYYY-MM-DD");
    const game = await connectionDB.query(
      `SELECT * FROM games 
       WHERE id = $1;`,
      [gameId]
    );
    const originalPrice = daysRented * game.rows[0].pricePerDay;
    
    let returnDate = null;
    let delayFee = null;

    //
    console.log(returnDate, delayFee);
    //

    await connectionDB.query(
      `INSERT INTO rentals 
       ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")  
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
       [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]
    );
    
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    await connectionDB.query(
      `DELETE FROM rentals
       WHERE id = $1;`,
      [id]
    );

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
export async function finalizeRent(req, res) {
  const { id } = req.params;
  try {
    const rental = await connectionDB.query(
      `SELECT * FROM rentals
       WHERE id = $1;`,
      [id]
    );
    const rentDate = dayjs(rental.rows[0].rentDate).format("YYYY-MM-DD");
    const returnDate = dayjs(Date.Now).format("YYYY-MM-DD");

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }



}
