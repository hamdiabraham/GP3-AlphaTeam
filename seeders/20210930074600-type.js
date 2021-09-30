'use strict';

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
   await queryInterface.bulkInsert('types', [{
     is_include_breakfast: false,
     type_name: 'standar',
     price: 300000,
     created_at: new Date(),
     updated_at: new Date()
   },{
    is_include_breakfast: true,
    type_name: 'deluxe',
    price: 800000,
    created_at: new Date(),
    updated_at: new Date()
   }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('types', null, {})
  }
};
