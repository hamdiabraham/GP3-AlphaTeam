const reservations = require("../models").Reservation;

class Reservation {
  static async create(req, res) {
    const { numberRoom, checkIn, checkOut } = req.body;
    if (!numberRoom || !checkIn || !checkOut) {
      res.status(400).json({
        message: "numberRoom, checkIn, and checkOut must be fill"
      });
    } else {
      const isEmptyRoom = await reservations.findOne({
        where: {
          room_id: numberRoom
        }
      });
      if (!isEmptyRoom) {
        res.status(409).json({
          message: "this room is not empty"
        });
      } else {
        const reservation = await reservations.create({
          user_id: null,
          room_id: numberRoom,
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
}
