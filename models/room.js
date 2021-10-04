"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Reservation, Type }) {
      this.hasOne(Reservation, {
        foreignKey: "room_id",
        sourceKey: "id"
      });
      this.belongsTo(Type, {
        foreignKey: "type_room_id",
        targetKey: "id"
      });
    }
  }
  Room.init(
    {
      type_room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Type,
          key: "id"
        }
      },
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
