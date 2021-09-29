const reservationRouter = require("express").Router();
const reservationController = require("../controllers/reservation");

reservationRouter.post("/reservation", reservationController.makeReservation);

module.exports = reservationRouter;
