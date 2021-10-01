const reservationRouter = require("express").Router();
const reservationController = require("../controllers/reservation");

reservationRouter.post("/reservation", reservationController.makeReservation);
reservationRouter.get("/reservation", reservationController.readAll);
reservationRouter.get("/reservation/:id", reservationController.readById);
reservationRouter.patch(
  "/reservation/:id",
  reservationController.updateReservation
);
reservationRouter.delete(
  "/reservation/:id",
  reservationController.deleteReservation
);

module.exports = reservationRouter;
