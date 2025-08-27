const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getQuestionsBySkill,
  deleteQuestion
} = require('../controllers/questionController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/:skill_id', protect);          // For users
router.post('/skills/:id/questions', protect, isAdmin, createQuestion);          // Admin only
router.delete('/:id', protect, isAdmin, deleteQuestion);         // Admin only
router.get('/skills/:id/questions', getQuestionsBySkill);

module.exports = router;
