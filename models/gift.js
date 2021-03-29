'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      gift.hasOne(models.order, {
          foreignKey: 'giftId',
          as: 'order',
      })
  }
  };
  gift.init({
    name: DataTypes.STRING,
    fromId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gift',
  });
  return gift;
};