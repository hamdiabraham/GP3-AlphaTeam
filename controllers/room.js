const rooms = require("../models").Room;

class Room {
  static async makeRoom(req, res, next) {
    const { type_room_id, is_single_bed } = req.body;
    if ((!type_room_id, !is_single_bed)) {
      next({
        code: 415,
        message: "type room and is single bed must be fill",
      });
    } else {
      const roomIsNotEmpty = await rooms.findOne({
        where: {
          type_room_id: type_room_id,
        },
      });
      if (roomIsNotEmpty) {
        next({
          code: 409,
          message: "this room is not empty",
        });
      } else {
        const room = await rooms.create({
          type_room_id: type_room_id,
          is_single_bed: is_single_bed,
        });
        res.status(200).json({
          message: "success make room",
          room,
        });
      }
    }
  }

  static async readAll(req, res) {
    let roomAll = await rooms.findAll();
    if (!roomAll.length) {
      next({
        code: 404,
        message: "rooms empty",
      });
    } else {
      res.status(200).json({
        message: "success getting all rooms",
        roomAll,
      });
    }
  }

  static async readById(req, res) {
    const { id } = req.params;
    const room = await rooms.findByPk(id);
    if (!room) {
      next({
        code: 404,
        message: "Room not found",
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
    const { type_room_id, is_single_bed } = req.body;
    const room = await rooms.findByPk(id);
    if (!room) {
      next({
        code: 404,
        message: "Room not found",
      });
    } else if ((!type_room_id, !is_single_bed)) {
      next({
        code: 415,
        message: "please fill type room and is single bed",
      });
    } else {
      room.type_room_id = +type_room_id || room.is_single_bed;
      room.is_single_bed = is_single_bed || room.is_single_bed;
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
        message: "room not found",
      });
    } else {
      room.is_deleted = true;
      room.save();
      res.status(200).json({ message: "success deleting room" });
    }
  }
}

module.exports = Room;
