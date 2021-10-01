const rooms = require("../models").Room;

class Room {
  static async chooseRoom(req, res) {
    const { isSingleBed } = req.body;

    if (!isSingleBed) {
      res.status(400).json({
        message: "isSingleBed must be fill",
      });
    } else {
      const room = await room.create({
        isSingleBed: isSingleBed,
      });

      res.status(200).json({
        message: "success choose room",
        room,
      });
    }
  }

  static async readAll(req, res) {
    let room = await rooms.findAll();
  }
}

module.exports = Room;
