const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.StockItem = require('./StockItem')(sequelize, DataTypes);
db.DccDetail = require('./DccDetail')(sequelize, DataTypes);
db.GoodsWagon = require('./GoodsWagon')(sequelize, DataTypes);
db.Coach = require('./Coach')(sequelize, DataTypes);
db.Box = require('./Box')(sequelize, DataTypes);
db.Compartment = require('./Compartment')(sequelize, DataTypes);
db.StockLocation = require('./StockLocation')(sequelize, DataTypes);

// Associations
db.StockItem.hasOne(db.DccDetail, { foreignKey: 'stock_id' });
db.StockItem.hasOne(db.GoodsWagon, { foreignKey: 'stock_id' });
db.StockItem.hasOne(db.Coach, { foreignKey: 'stock_id' });

db.Box.hasMany(db.Compartment, { foreignKey: 'box_id' });
db.Compartment.belongsTo(db.Box, { foreignKey: 'box_id' });

db.StockItem.belongsToMany(db.Compartment, { through: db.StockLocation, foreignKey: 'stock_id' });
db.Compartment.belongsToMany(db.StockItem, { through: db.StockLocation, foreignKey: 'compartment_id' });

module.exports = db;