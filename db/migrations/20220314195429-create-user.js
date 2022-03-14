'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      bio: {
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      profilePicture: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      websiteLink: {
        type: Sequelize.STRING
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};