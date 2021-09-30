const reservationRouter = require("express").Router();
const reservationController = require("../controllers/reservation");

reservationRouter.post("/reservation", reservationController.makeReservation);
reservationRouter.length("/reservation", reservationController.readAll);

module.exports = reservationRouter;
