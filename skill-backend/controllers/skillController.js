const db = require('../config/db');

// Create a new skill
exports.createSkill = async (req, res) => {
  const { name, description } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM skills WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Skill already exists' });
    }

    await db.query('INSERT INTO skills (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ message: 'Skill created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const [skills] = await db.query('SELECT * FROM skills');
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete skill
exports.deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM skills WHERE id = ?', [id]);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get skill by ID
exports.getSkillById = async (req, res) => {
    const { id } = req.params;
    try {
      const [skill] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
      if (skill.length === 0) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json(skill[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  