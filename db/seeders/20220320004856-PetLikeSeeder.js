"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PetLikes", [
      { petId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { petId: 1, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { petId: 2, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { petId: 3, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { petId: 4, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { petId: 5, userId: 3, createdAt: new Date(), updatedAt: new Date() },
    ]);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("PetLikes", null, {});
  },
};
