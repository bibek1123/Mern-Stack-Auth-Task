require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const indexRoutes = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/v1', indexRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
