"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "PetTypes",
      [
        { type: "Cat", createdAt: new Date(), updatedAt: new Date() },
        { type: "Dog", createdAt: new Date(), updatedAt: new Date() },
        { type: "Hamster", createdAt: new Date(), updatedAt: new Date() },
        { type: "Fish", createdAt: new Date(), updatedAt: new Date() },
        { type: "Turtle", createdAt: new Date(), updatedAt: new Date() },
        { type: "Snake", createdAt: new Date(), updatedAt: new Date() },
        { type: "Lizard", createdAt: new Date(), updatedAt: new Date() },
        { type: "Bird", createdAt: new Date(), updatedAt: new Date() },
        { type: "Rabbit", createdAt: new Date(), updatedAt: new Date() },
        { type: "Guinea Pig", createdAt: new Date(), updatedAt: new Date() },
        { type: "Ferret", createdAt: new Date(), updatedAt: new Date() },
        { type: "Rat", createdAt: new Date(), updatedAt: new Date() },
        { type: "Frog", createdAt: new Date(), updatedAt: new Date() },
        { type: "Mice", createdAt: new Date(), updatedAt: new Date() },
        { type: "Horse", createdAt: new Date(), updatedAt: new Date() },
        { type: "Primate", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("PetTypes", null, {});
  },
};
