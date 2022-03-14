'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    userName: DataTypes.STRING,
    bio: DataTypes.TEXT,
    email: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    banner: DataTypes.STRING,
    websiteLink: DataTypes.STRING,
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Tag, { foreignKey: 'userId' })
    User.hasMany(models.Pet, { foreignKey: 'userId' })
    User.belongsToMany(models.Pet, {
      through: 'petLikes',
      foreignKey: 'userId',
      otherKey: 'petsId'
    })
    User.belongsToMany(models.Comment, {
      through: 'commentLikes',
      foreignKey: 'userId',
      otherKey: 'commentId'
    })
  };
  return User;
};