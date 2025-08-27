const express = require('express');
const router = express.Router();
const {
  createSkill,
  getSkills,
  getSkillById, 
  deleteSkill,
} = require('../controllers/skillController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', getSkills);                           // GET all skills
router.get('/:id', getSkillById);                     // GET one skill by ID
router.post('/', protect, isAdmin, createSkill);      // Admin only
router.delete('/:id', protect, isAdmin, deleteSkill); // Admin only

module.exports = router;
