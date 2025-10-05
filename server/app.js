const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(express.static('client'));

const db = require('./models');
db.sequelize.sync();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });
app.set('upload', upload);

// Routes
const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stock', stockRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));