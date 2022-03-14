'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetType = sequelize.define('PetType', {
    type: DataTypes.STRING
  }, {});
  PetType.associate = function (models) {
    PetType.hasMany(models.Pet, { foreignKey: 'petTypeId' })
  };
  return PetType;
};