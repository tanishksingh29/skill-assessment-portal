const db = require('../config/db');

// Avg. score per skill across all users
exports.getSkillPerformance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        s.name AS skill,
        ROUND(AVG(qa.score / qa.total_questions * 100), 2) AS average_score_percent
      FROM quiz_attempts qa
      JOIN skills s ON qa.skill_id = s.id
      GROUP BY s.name
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Skill gap for a specific user
exports.getUserSkillGap = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.query(`
      SELECT 
        s.name AS skill,
        ROUND(AVG(qa.score / qa.total_questions * 100), 2) AS user_score_percent
      FROM quiz_attempts qa
      JOIN skills s ON qa.skill_id = s.id
      WHERE qa.user_id = ?
      GROUP BY s.name
      HAVING user_score_percent < 60
    `, [userId]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Time-based report (last week/month)
exports.getTimeReport = async (req, res) => {
  const range = req.query.range || 'week';

  let interval = '7 DAY';
  if (range === 'month') interval = '30 DAY';

  try {
    const [rows] = await db.query(`
      SELECT 
        DATE(qa.attempted_at) AS date,
        COUNT(*) AS attempts,
        ROUND(AVG(qa.score / qa.total_questions * 100), 2) AS avg_score
      FROM quiz_attempts qa
      WHERE qa.attempted_at >= NOW() - INTERVAL ${interval}
      GROUP BY DATE(qa.attempted_at)
      ORDER BY DATE(qa.attempted_at)
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOverallReport = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          qa.id AS attempt_id,
          u.name AS user_name,
          s.name AS skill_name,
          qa.score,
          qa.total_questions,
          qa.attempted_at
        FROM quiz_attempts qa
        JOIN users u ON qa.user_id = u.id
        JOIN skills s ON qa.skill_id = s.id
        ORDER BY qa.attempted_at DESC
      `);
  
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
