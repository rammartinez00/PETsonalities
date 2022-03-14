'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetLike = sequelize.define('PetLike', {
    petId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  PetLike.associate = function (models) {
    // associations can be defined here
  };
  return PetLike;
};