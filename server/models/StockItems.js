module.exports = (sequelize, DataTypes) => {
  return sequelize.define('StockItem', {
    stock_type: DataTypes.ENUM('locomotive', 'goods_wagon', 'coach'),
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    livery: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    scale: DataTypes.ENUM('OO', 'N', 'HO', 'O', 'G'),
    era: DataTypes.STRING,
    notes: DataTypes.TEXT,
    image_path: DataTypes.STRING
  });
};