const db = require('../models');
const { StockItem, DccDetail, GoodsWagon, Coach, Compartment, StockLocation } = db;

exports.getAllStock = async (req, res) => {
  const items = await StockItem.findAll({
    include: [DccDetail, GoodsWagon, Coach, { model: Compartment }]
  });
  res.json(items);
};

exports.createStockWithImage = async (req, res) => {
  try {
    const { stock_type, ...baseData } = req.body;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await StockItem.create({ stock_type, ...baseData, image_path });

    if (stock_type === 'locomotive' && req.body.dcc) {
      await DccDetail.create({ stock_id: item.id, ...JSON.parse(req.body.dcc) });
    }
    if (stock_type === 'goods_wagon' && req.body.goods) {
      await GoodsWagon.create({ stock_id: item.id, ...JSON.parse(req.body.goods) });
    }
    if (stock_type === 'coach' && req.body.coach) {
      await Coach.create({ stock_id: item.id, ...JSON.parse(req.body.coach) });
    }

    if (req.body.location) {
      const { box_id, layer_number, compartment_number } = JSON.parse(req.body.location);
      let compartment = await Compartment.findOne({ where: { box_id, layer_number, compartment_number } });
      if (!compartment) {
        compartment = await Compartment.create({ box_id, layer_number, compartment_number });
      }
      const count = await StockLocation.count({ where: { compartment_id: compartment.id } });
      if (count >= 3) return res.status(400).send('Compartment full (max 3 items)');
      await StockLocation.create({ stock_id: item.id, compartment_id: compartment.id });
    }

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating stock');
  }
};

exports.getStockById = async (req, res) => {
  const item = await StockItem.findByPk(req.params.id, { include: [DccDetail, GoodsWagon, Coach, Compartment] });
  if (!item) return res.status(404).send('Not found');
  res.json(item);
};

exports.updateStock = async (req, res) => {
  await StockItem.update(req.body, { where: { id: req.params.id } });
  res.send('Updated');
};

exports.deleteStock = async (req, res) => {
  await StockItem.destroy({ where: { id: req.params.id } });
  res.send('Deleted');
};