const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const questionRoutes = require('./routes/questionRoutes');
const reportRoutes = require('./routes/reportRoutes');
const quizRoutes = require('./routes/quizRoutes');


dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes); 
app.use('/api', questionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running...');
});
