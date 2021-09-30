const reservations = require("../models").Reservation;

class Reservation {
  static async makeReservation(req, res) {
    const user = null;
    const { roomNumber, checkIn, checkOut } = req.body;
    if (!roomNumber || !checkIn || !checkOut) {
      res.status(400).json({
        message: "numberRoom, checkIn, and checkOut must be fill"
      });
    } else {
      const isNotEmptyRoom = await reservations.findOne({
        where: {
          room_id: +roomNumber
        }
      });
      if (isNotEmptyRoom) {
        res.status(409).json({
          message: "this room is not empty"
        });
      } else {
        const reservation = await reservations.create({
          user_id: user,
          room_id: +roomNumber,
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
    let reservationAll = await reservations.findAll();
    if (!reservationAll) {
      res.status(404).json({
        message: "reservations empty"
      });
    } else {
      reservationAll = reservationAll.filter(item => !item.is_deleted);
      res.status(200).json({
        message: "success getting all reservation",
        reservationAll
      });
    }
  }

  static async readById(req, res) {
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (!reservation || reservation.is_deleted) {
      res.status(404).json({
        message: "reservation not found"
      });
    } else {
      res.status(200).json({
        message: "success getting reservation",
        reservation
      });
    }
  }

  static async updateReservation(req, res) {
    const { id } = req.params;
    const { roomNumber, checkIn, checkOut } = req.body;
    const reservation = await reservations.findByPk(id);
    if (!reservation) {
      res.status(404).json({
        message: "reservation not found"
      });
    } else {
      reservation.room_id = roomNumber || reservation.room_id;
      reservation.check_in = checkIn || reservation.check_in;
      reservation.check_out = checkOut || reservation.check_out;
      reservation.save();

      res.status(200).json({
        message: "success update reservation",
        reservation
      });
    }
  }
}

module.exports = Reservation;
