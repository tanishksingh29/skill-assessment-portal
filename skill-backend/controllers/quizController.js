const db = require('../config/db');

exports.submitQuiz = async (req, res) => {
    const userId = req.user.id;
    const { skillId, answers } = req.body; 
  
    try {
      // Fetch all questions for this skill
      const [questions] = await db.query(
        'SELECT id, correct_answer FROM questions WHERE skill_id = ?',
        [skillId]
      );
  
      let score = 0;
      const results = answers.map(ans => {
        const question = questions.find(q => q.id === ans.questionId);
        const isCorrect = question && question.correct_answer === ans.selectedOption;
        if (isCorrect) score++;
        return {
          question_id: ans.questionId,
          selected_answer: ans.selectedOption,
          is_correct: isCorrect ? 1 : 0,
        };
      });
  
      // Insert into quiz_attempts
      const [attemptResult] = await db.query(
        'INSERT INTO quiz_attempts (user_id, skill_id, score, total_questions) VALUES (?, ?, ?, ?)',
        [userId, skillId, score, questions.length]
      );
      const attemptId = attemptResult.insertId;
  
      // Insert answers
      for (const r of results) {
        await db.query(
          'INSERT INTO quiz_answers (attempt_id, question_id, selected_answer, is_correct) VALUES (?, ?, ?, ?)',
          [attemptId, r.question_id, r.selected_answer, r.is_correct]
        );
      }
  
      res.status(201).json({
        message: 'Quiz submitted successfully',
        score,
        total_questions: questions.length,
        attempt_id: attemptId,
      });
    } catch (err) {
      console.error('Error submitting quiz:', err.message);
      res.status(500).json({ error: 'Failed to submit quiz' });
    }
  };
  
// Get user's quiz history
exports.getQuizHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const [attempts] = await db.query(
      `SELECT qa.id, s.name AS skill_name, qa.score, qa.total_questions, qa.attempted_at
       FROM quiz_attempts qa
       JOIN skills s ON qa.skill_id = s.id
       WHERE qa.user_id = ?
       ORDER BY qa.attempted_at DESC`,
      [userId]
    );
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View one quiz attempt in detail
exports.getQuizAttempt = async (req, res) => {
  const userId = req.user.id;
  const { attempt_id } = req.params;

  try {
    const [attempts] = await db.query(
      `SELECT * FROM quiz_attempts WHERE id = ? AND user_id = ?`,
      [attempt_id, userId]
    );

    if (attempts.length === 0) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    const [answers] = await db.query(
      `SELECT qa.*, q.question_text, q.correct_answer
       FROM quiz_answers qa
       JOIN questions q ON qa.question_id = q.id
       WHERE qa.attempt_id = ?`,
      [attempt_id]
    );

    res.json({
      attempt: attempts[0],
      answers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get questions for a skill
exports.getQuestionsForSkill = async (req, res) => {
  const { skillId } = req.params;
  try {
    const [questions] = await db.query(
      `SELECT id, question_text, options FROM questions WHERE skill_id = ?`,
      [skillId]
    );

    const formattedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question_text,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
    }));

    res.json(formattedQuestions);
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};
  
