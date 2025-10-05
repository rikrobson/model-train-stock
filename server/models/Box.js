module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Box', {
    label: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT
  });
};

