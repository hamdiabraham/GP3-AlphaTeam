"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(5)
      },
      user_id: {
        type: Sequelize.INTEGER(4),
        references: {
          model: "users",
          key: "id"
        }
      },
      room_id: {
        type: Sequelize.INTEGER(3)
      },
      check_in: {
        type: Sequelize.DATE
      },
      check_out: {
        type: Sequelize.DATE
      },
      is_deleted: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reservations");
  }
};
