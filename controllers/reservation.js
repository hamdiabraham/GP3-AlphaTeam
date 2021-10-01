const reservations = require("../models").Reservation;

class Reservation {
  static async makeReservation(req, res, next) {
    const user = null;
    const { roomNumber, checkIn, checkOut } = req.body;
    if (!roomNumber || !checkIn || !checkOut) {
      next({
        code: 415,
        message: "numberRoom, checkIn, and checkOut must be fill"
      });
    } else {
      const isNotEmptyRoom = await reservations.findOne({
        where: {
          room_id: +roomNumber
        }
      });
      if (isNotEmptyRoom) {
        next({
          code: 409,
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
    const user = null;
    let reservationAll = await reservations.findAll();
    reservationAll = reservationAll
      ? reservationAll.filter(item => !item.is_deleted)
      : [];
    if (!reservationAll.length) {
      next({
        code: 404,
        message: "reservations empty"
      });
    } else {
      res.status(200).json({
        message: "success getting all reservation",
        reservations: reservationAll
      });
    }
  }

  static async readById(req, res) {
    const user = null;
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (!reservation || reservation.is_deleted) {
      next({
        code: 404,
        message: "reservation not found"
      });
    } else {
      res.status(200).json({
        message: "success geting reservation",
        reservation
      });
    }
  }

  static async updateReservation(req, res) {
    const user = null;
    const { id } = req.params;
    const { roomNumber, checkIn, checkOut } = req.body;
    const reservation = await reservations.findByPk(id);
    if (!reservation) {
      next({
        code: 404,
        message: "reservation not found"
      });
    } else if (!roomNumber && !checkIn && !checkOut) {
      next({
        code: 415,
        message: "please fill roomNumber, checkIn, or checkOut"
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

  static async deleteReservation(req, res) {
    const user = null;
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (!reservation) {
      next({
        code: 404,
        message: "reservation not found"
      });
    } else {
      reservation.is_deleted = true;
      reservation.save();
      res.status(200).json({
        message: "success deleting reservation"
      });
    }
  }
}

module.exports = Reservation;
