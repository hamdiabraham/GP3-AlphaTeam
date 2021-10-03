"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      type_room_id: DataTypes.INTEGER,
      is_single_bed: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Room",
      underscored: true
    }
  );
  return Room;
};
