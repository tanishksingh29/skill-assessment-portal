const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');



const app = express();
const skillRoutes = require('./routes/skillRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/report', reportRoutes);

app.use('/api/quiz', quizRoutes);

app.use('/api/questions', questionRoutes);

app.use('/api/skills', skillRoutes);

app.use('/api/auth', authRoutes);
app.use(cors());
app.use(express.json());

// For testing
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ success: true, message: 'DB Connected!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


module.exports = app;
