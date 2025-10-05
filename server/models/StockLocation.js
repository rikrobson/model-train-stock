module.exports = (sequelize, DataTypes) => {
  return sequelize.define('StockLocation', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
  });
};