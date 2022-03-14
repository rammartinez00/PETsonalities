'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('PetTypes', [
      { type: 'Cat', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Dog', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Hamster', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Fish', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Turtle', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Snake', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Lizard', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Birds', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Rabbits', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Guinea Pig', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Ferrets', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Rats', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Frogs', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Mice', createdAt: new Date(), updatedAt: new Date() },
      { type: 'Horse', createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('PetTypes', null, {});
  }
};
