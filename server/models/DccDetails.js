module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DccDetail', {
    stock_id: { type: DataTypes.INTEGER, primaryKey: true },
    dcc_address: DataTypes.INTEGER,
    dcc_protocol: DataTypes.ENUM('NMRA', 'Motorola', 'Selectrix'),
    decoder_type: DataTypes.STRING
  });
};