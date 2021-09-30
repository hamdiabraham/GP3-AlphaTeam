const reservations = require("../models").Reservation;

class Reservation {
  static async makeReservation(req, res) {
    const user = null;
    const { numberRoom, checkIn, checkOut } = req.body;
    if (!numberRoom || !checkIn || !checkOut) {
      res.status(400).json({
        message: "numberRoom, checkIn, and checkOut must be fill"
      });
    } else {
      const isNotEmptyRoom = await reservations.findOne({
        where: {
          room_id: +numberRoom
        }
      });
      if (isNotEmptyRoom) {
        res.status(409).json({
          message: "this room is not empty"
        });
      } else {
        const reservation = await reservations.create({
          user_id: user,
          room_id: +numberRoom,
          check_in: checkIn,
          check_out: checkOut,
          is_deleted: false
        });
        res.status(201).json({
          message: "success make reservation",
          reservation
        });
      }
    }
  }

  static async readAll(req, res) {
    const reservation = await reservations.findAll();
    if (!reservation) {
      res.status(404).json({
        message: "reservation empty"
      });
    } else {
      res.status(200).json({
        message: "success getting reservation",
        reservation
      });
    }
  }
}

module.exports = Reservation;
