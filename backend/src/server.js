const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const workoutsRouter = require('./routes/workouts');
const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');
const gptRouter = require('./routes/gpt');
const schedulesRouter = require('./routes/schedules');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/workouts', workoutsRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/users', userRouter);
app.use('/api/gpt', gptRouter);
app.use('/api/schedules', schedulesRouter);

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