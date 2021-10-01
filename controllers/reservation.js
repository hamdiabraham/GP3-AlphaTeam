const reservations = require("../models").Reservation;

class Reservation {
  static async makeReservation(req, res) {
    const user = req.currentUser;
    const { roomNumber, checkIn, checkOut } = req.body;
    if (!user.is_guest) {
      res.status(403).json({
        message: "this user cannot make reservation"
      });
    } else if (!roomNumber || !checkIn || !checkOut) {
      res.status(400).json({
        message: "roomNumber, checkIn, and checkOut must be fill"
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

  static async readAll(req, res) {
    const user = req.currentUser;
    let reservationAll = await reservations.findAll();
    reservationAll = reservationAll
      ? reservationAll.filter(
          item =>
            (!item.is_deleted && item.user_id === user.id) || !user.is_guest
        )
      : [];
    if (!reservationAll.length) {
      res.status(404).json({
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
    const user = req.currentUser;
    const { id } = req.params;
    const reservation = await reservations.findByPk(id);
    if (
      (!reservation ||
        reservation.is_deleted ||
        user.id !== reservation.user_id) &&
      !user.is_guest
    ) {
      res.status(404).json({
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
    const user = req.currentUser;
    const { id } = req.params;
    const { roomNumber, checkIn, checkOut } = req.body;
    const reservation = await reservations.findByPk(id);
    if ((!reservation || user.id !== reservation.user_id) && !user.is_guest) {
      res.status(404).json({
        message: "reservation not found"
      });
    } else if (!roomNumber && !checkIn && !checkOut) {
      res.status(400).json({
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
      res.status(404).json({
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
