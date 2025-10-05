module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Coach', {
    stock_id: { type: DataTypes.INTEGER, primaryKey: true },
    coach_type: DataTypes.STRING,
    class: DataTypes.ENUM('First', 'Second', 'Composite'),
    seating_capacity: DataTypes.INTEGER
  });
};