const express = require('express');
const router = express.Router();
const {
  getSkillPerformance,
  getUserSkillGap,
  getTimeReport,
} = require('../controllers/reportController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const { getOverallReport } = require('../controllers/reportController');

router.get('/skill-performance', protect, isAdmin, getSkillPerformance);
router.get('/user-skill-gap/:userId', protect, isAdmin, getUserSkillGap);
router.get('/timeline', protect, isAdmin, getTimeReport);
router.get('/overall', protect, isAdmin, getOverallReport);

module.exports = router;
