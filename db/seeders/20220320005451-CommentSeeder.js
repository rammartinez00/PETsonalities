"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        content: "I love this pet!!!",
        petId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "This pet is so majestic!",
        petId: 4,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "hahaha I like Balogna too",
        petId: 2,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "(👍 ͡❛ ͜ʖ ͡❛)👍",
        petId: 6,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
