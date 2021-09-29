"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        onDelete: "RESTRICT",
        foreignKey: "user_id"
      });
    }
  }
  Reservation.init(
    {
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Reservation"
    }
  );
  return Reservation;
};
