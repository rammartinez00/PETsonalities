'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tag: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Tag.associate = function (models) {
    Tag.belongsTo(models.User, { foreignKey: 'userId' })
    Tag.belongsToMany(models.Pet, {
      through: 'petTags',
      foreignKey: 'tagId',
      otherKey: 'petId'
    })
  };
  return Tag;
};