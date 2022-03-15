'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [{
      fullName: 'demo',
      userName: 'demo',
      email: 'demo@demo.demo',
      hashedPassword: '$2a$10$Rpj0KptKModLClfLpIKlNuMM.n2UDUlb7ttMvPMcRCfpg1t.NUIcC',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
