const db = require('../config/db');

// Add question
exports.createQuestion = async (req, res) => {
    const { id } = req.params; 
    const { question_text, options, correct_answer } = req.body;
  
    try {
      await db.query(
        'INSERT INTO questions (skill_id, question_text, options, correct_answer) VALUES (?, ?, ?, ?)',
        [id, question_text, JSON.stringify(options), correct_answer]
      );
      res.status(201).json({ message: 'Question added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Get questions by skill
exports.getQuestionsBySkill = async (req, res) => {
    const { id } = req.params;
    try {
      const [questions] = await db.query(
        'SELECT * FROM questions WHERE skill_id = ?',
        [id]
      );
      res.json(questions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Delete question
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM questions WHERE id = ?', [id]);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
