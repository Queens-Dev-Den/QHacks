const app = require('./server');
const bodyParser = require('body-parser');

// Use the body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define your API routes
const userRoutes = require('./routes/users');
const gptRoutes = require('./routes/gpt');
const workoutsRoutes = require('./routes/workouts');
const exercisesRoutes = require('./routes/exercises');

app.use('/api/users', userRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api/exercises', exercisesRoutes);