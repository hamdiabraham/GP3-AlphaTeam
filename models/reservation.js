"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Room }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        targetKey: "id"
      });
      this.belongsTo(Room, {
        foreignKey: "room_id",
        targetKey: "id"
      });
    }
  }
  Reservation.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.User,
          key: "id"
        }
      },
      room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Room,
          key: "id"
        }
      },
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
      is_deleted: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Reservation",
      underscored: true
    }
  );
  return Reservation;
};
