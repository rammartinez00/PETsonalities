'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    petId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Comment.associate = function (models) {
    Comment.belongsTo(models.Pet, { foreignKey: 'petId' })
    Comment.belongsToMany(models.User, {
      through: 'commentLikes',
      foreignKey: 'commentId',
      otherKey: 'userId'
    })

  };
  return Comment;
};