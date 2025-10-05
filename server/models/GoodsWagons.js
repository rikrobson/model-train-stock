module.exports = (sequelize, DataTypes) => {
  return sequelize.define('GoodsWagon', {
    stock_id: { type: DataTypes.INTEGER, primaryKey: true },
    wagon_type: DataTypes.STRING,
    load_type: DataTypes.STRING,
    axle_count: DataTypes.INTEGER
  });
};