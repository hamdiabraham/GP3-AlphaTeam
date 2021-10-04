"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("rooms", [
      {
        type_room_id: 1,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 1,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 1,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 1,
        is_single_bed: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 1,
        is_single_bed: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 2,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 2,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 2,
        is_single_bed: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 2,
        is_single_bed: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        type_room_id: 2,
        is_single_bed: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("rooms", null, {});
  }
};
