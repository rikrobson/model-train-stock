module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Compartment', {
    layer_number: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
    compartment_number: { type: DataTypes.INTEGER, validate: { min: 1, max: 9 } }
  });
};