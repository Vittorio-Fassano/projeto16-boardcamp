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
    console.log(returnDate, delayFee);

    //remove an item from stockTotal in games table
    const games = await connectionDB.query(
      `SELECT * FROM games WHERE id = $1`,
      [gameId]
    );
    const removeOneFromStock = games.rows[0].stockTotal - 1;
    console.log(removeOneFromStock);
    //use forEach?

    await connectionDB.query(
      `INSERT INTO rentals 
       ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")  
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        daysRented,
        rentDate,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function finalizeRental(req, res) {
  const { id } = req.params;
  try {
    const rental = await connectionDB.query(
      `SELECT * FROM rentals
       WHERE id = $1;`,
      [id]
    );
    const rentDate = dayjs(rental.rows[0].rentDate).format("YYYY-MM-DD");
    const returnDate = dayjs(Date.Now).format("YYYY-MM-DD");

    const diff = new Date(returnDate) - new Date(rentDate);
    const outdatedDays = diff / (1000 * 60 * 60 * 24);
    console.log(outdatedDays);

    //how to test if the delayFee, consequently the outdatedDays, is working???
    const price = rental.rows[0].originalPrice;
    const delayFee = outdatedDays * price;
    console.log(delayFee);

    //add an item from sotckTotal in games table
    //

    // await connectionDB.query(
    //   `UPDATE games
    //    SET "stockTotal" = $1
    //    WHERE games.id = rentals.id ;`,
    //   [sotckTotal]
    // );

    await connectionDB.query(
      `UPDATE rentals
       SET "returnDate" = $1, "delayFee" = $2
       WHERE id = $3;`,
      [returnDate, delayFee, id]
    );

    res.sendStatus(200);
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

    //remove an item from sotckTotal in games table
    //

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function allRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    const rentals = await connectionDB.query(
      `SELECT 
      rentals.*, 
      customers.id, customers.name, 
      games.id, games.name, games."categoryId", 
      categories.name AS "categoryName" 
      FROM rentals 
      JOIN customers ON customers.id = rentals."customerId" 
      JOIN games ON games.id = rentals."gameId" 
      JOIN categories ON categories.id = games."categoryId";`
    );
    res.send(rentals.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
