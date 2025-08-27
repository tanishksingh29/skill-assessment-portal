const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { submitQuiz, getQuizHistory, getQuizAttempt, getQuestionsForSkill } = require('../controllers/quizController');

router.get('/start/:skillId', protect, getQuestionsForSkill); 
router.post('/submit', protect, submitQuiz);
router.get('/history', protect, getQuizHistory);
router.get('/:attempt_id', protect, getQuizAttempt);


module.exports = router;
