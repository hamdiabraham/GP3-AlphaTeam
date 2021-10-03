"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Room }) {
      this.hasMany(Room, {
        foreignKey: "type_room_id",
        sourceKey: "id"
      });
    }
  }
  Type.init(
    {
      is_include_breakfast: DataTypes.BOOLEAN,
      type_name: DataTypes.STRING,
      price: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Type",
      underscored: true
    }
  );
  return Type;
};
