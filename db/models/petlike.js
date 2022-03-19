'use strict';
module.exports = (sequelize, DataTypes) => {
  const PetLike = sequelize.define('PetLike', {
    petId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  PetLike.associate = function (models) {
    PetLike.belongsTo(models.Pet, { foreignKey: 'petId' })
    // PetLike.belongsTo(models.Pet, { as: 'petsLikedByUser', foreignKey: 'petId' })
  };
  return PetLike;
};