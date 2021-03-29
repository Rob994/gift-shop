'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.order, {
          foreignKey: 'userId',
          as: 'order'
      });
      user.hasOne(models.gift, {
          foreignKey: 'fromId',
          as: 'gift'
      });
  }
  };
  user.init({
    name: DataTypes.STRING,
    number: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};