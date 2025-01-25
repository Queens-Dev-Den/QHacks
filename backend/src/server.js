const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync(); // Sync models with the database
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;