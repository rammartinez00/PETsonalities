'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    petTypeId: DataTypes.INTEGER,
    birthday: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER
  }, {});
  Pet.associate = function (models) {
    Pet.hasMany(models.Comment, { foreignKey: 'petId' })
    Pet.hasMany(models.PetLike, { foreignKey: 'petId' })
    Pet.belongsTo(models.User, { foreignKey: 'userId' })
    Pet.belongsTo(models.PetType, { foreignKey: 'petTypeId' })
    Pet.belongsToMany(models.User, {
      through: 'petLikes',
      foreignKey: 'petId',
      otherKey: 'userId'
    })
  };
  return Pet;
};