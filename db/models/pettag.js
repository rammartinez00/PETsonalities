'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetTag = sequelize.define('PetTag', {
    tagId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER
  }, {});
  PetTag.associate = function (models) {
    // associations can be defined here
  };
  return PetTag;
};