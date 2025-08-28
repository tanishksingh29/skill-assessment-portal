const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const quizRoutes = require('./routes/quizRoutes');

// DB connection
const db = require('./config/db');

dotenv.config();

app.use(cors());
app.use(express.json());

// Test root route
app.get('/', (req, res) => res.send('Skill Assessment Backend is running...'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api', questionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/quiz', quizRoutes);

// Start server after DB connection
const PORT = process.env.PORT || 5000;

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit so Railway sees the failure
  } else {
    console.log('Database connected successfully!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
  }
});
