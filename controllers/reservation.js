const reservations = require("../models").Reservation;

class Reservation {
  static async makeReservation(req, res, next) {
    const user = req.currentUser;
    const { roomNumber, checkIn, checkOut } = req.body;
    if (!user.is_guest) {
      next({
        code: 403,
        message: "user admin cannot make reservation"
      });
    } else if (!roomNumber || !checkIn || !checkOut) {
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
      if (isNotEmptyRoom && !isNotEmptyRoom.is_deleted) {
        next({
          code: 409,
          message: "this room is not empty"
        });
      } else {
        const reservation = await reservations.create({
          user_id: user.id,
          room_id: +roomNumber,
          check_in: checkIn,
          check_out: checkOut
        });
        res.status(201).json({
          message: "success make reservation",
          reservation
        });
      }
    }
  }

  static async readAll(req, res, next) {
    const user = req.currentUser;
    let reservationAll = await reservations.findAll();
    reservationAll = reservationAll
      ? reservationAll.filter(
          item =>
            (!item.is_deleted && item.user_id === user.id) || !user.is_guest
        )
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

  static async readById(req, res, next) {
    const user = req.currentUser;
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (
      (!reservation ||
        reservation.is_deleted ||
        user.id !== reservation.user_id) &&
      user.is_guest
    ) {
      next({
        code: 404,
        message: "reservations not found"
      });
    } else {
      res.status(200).json({
        message: "success geting reservation",
        reservation
      });
    }
  }

  static async updateReservation(req, res, next) {
    const user = req.currentUser;
    const { id } = req.params;
    const { roomNumber, checkIn, checkOut } = req.body;
    const reservation = await reservations.findByPk(id);
    if (
      !reservation ||
      (user.id !== reservation.user_id && user.is_guest) ||
      reservation.is_deleted
    ) {
      next({
        code: 404,
        message: "reservations not found"
      });
    } else if (!roomNumber && !checkIn && !checkOut) {
      next({
        code: 415,
        message: "please fill roomNumber, checkIn, or checkOut"
      });
    } else {
      reservation.room_id = +roomNumber || reservation.room_id;
      reservation.check_in = checkIn || reservation.check_in;
      reservation.check_out = checkOut || reservation.check_out;
      reservation.save();

      res.status(200).json({
        message: "success update reservation",
        reservation
      });
    }
  }

  static async deleteReservation(req, res, next) {
    const user = req.currentUser;
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (!reservation || (user.id !== reservation.user_id && user.is_guest)) {
      next({
        code: 404,
        message: "reservations not found"
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
