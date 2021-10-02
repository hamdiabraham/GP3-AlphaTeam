const rooms = require("../models").Room;

class Room {
  static async makeRoom(req, res) {
    const { is_single_bed } = req.body;
    if (!is_single_bed) {
    }
  }

  static async readAll(req, res) {
    let roomAll = await rooms.findAll();
    if (!roomAll) {
      res.status(404).json({
        message: "room not found",
      });
    } else {
      roomAll = roomAll.filter((item) => !item.is_deleted);
      res.status(200).json({
        message: "success getting all rooms",
        room,
      });
    }
  }

  static async readById(req, res) {
    const { id } = req.params;
    const room = await rooms.findByPk(id);
    if (!room) {
      res.status(404).json({
        message: "room not found",
      });
    } else {
      res.status(200).json({
        message: "success getting room",
        room,
      });
    }
  }

  static async updateRoom(req, res) {
    const { id } = req.params;
    const { isSingleBed } = req.body;
    const room = await rooms.findByPk(id);
    if (!room) {
      res.status(404).json({
        message: "room not found",
      });
    } else if (!isSingleBed) {
      res.status(400).json({
        message: "please fill isSingleBed",
      });
    } else {
      room.is_single_bed = isSingleBed || room.is_single_bed;
      reservation.save();

      res.status(200).json({
        message: "success update room",
        room,
      });
    }
  }

  static async deleteRoom(req, res) {
    const { id } = req.params;
    const room = await rooms.findByPk(id);
    if (!room) {
      res.status(404).json({
        message: "reservation not found",
      });
    } else {
      room.is_deleted = true;
      room.save();
      res.status(200).json({ message: "success deleting room" });
    }
  }
}

module.exports = Room;
