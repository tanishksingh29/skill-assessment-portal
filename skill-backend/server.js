const express = require('express');
const cors = require('cors');
require('dotenv').config(); // local development
const db = require('./db'); // import the db connection

const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api', questionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/quiz', quizRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Skill Assessment API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
