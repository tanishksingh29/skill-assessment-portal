import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

function ManageQuestions() {
  const { skillId } = useParams();
  const [skillName, setSkillName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
  });

  useEffect(() => {
    fetchSkill();
    fetchQuestions();
  }, []);

  const fetchSkill = async () => {
    const res = await api.get(`/skills/${skillId}`);
    setSkillName(res.data.name);
  };

  const fetchQuestions = async () => {
    const res = await api.get(`/skills/${skillId}/questions`);
    setQuestions(res.data);
  };
  

  const handleAddQuestion = async () => {
    const { question, optionA, optionB, optionC, optionD, correctAnswer } = newQ;
    if (!question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      return alert('All fields are required');
    }
  
    await api.post(`/skills/${skillId}/questions`, {
      question_text: question,
      options: [optionA, optionB, optionC, optionD],
      correct_answer: correctAnswer
    });
  
    setNewQ({ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' });
    fetchQuestions();
  };
  

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    await api.delete(`/questions/${id}`);
    fetchQuestions();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Questions for: {skillName}
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">➕ Add New Question</Typography>
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
          <TextField
            label="Question"
            value={newQ.question}
            onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
          />
          <TextField label="Option A" value={newQ.optionA} onChange={(e) => setNewQ({ ...newQ, optionA: e.target.value })} />
          <TextField label="Option B" value={newQ.optionB} onChange={(e) => setNewQ({ ...newQ, optionB: e.target.value })} />
          <TextField label="Option C" value={newQ.optionC} onChange={(e) => setNewQ({ ...newQ, optionC: e.target.value })} />
          <TextField label="Option D" value={newQ.optionD} onChange={(e) => setNewQ({ ...newQ, optionD: e.target.value })} />
          <TextField
            label="Correct Answer"
            value={newQ.correctAnswer}
            onChange={(e) => setNewQ({ ...newQ, correctAnswer: e.target.value })}
          />
          <Button variant="contained" onClick={handleAddQuestion}>Add Question</Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">📄 All Questions</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {questions.map((q) => (
    <TableRow key={q.id}>
      <TableCell>{q.question_text}</TableCell>
      <TableCell>
  {Array.isArray(q.options) ? q.options.join(' | ') : JSON.parse(q.options).join(' | ')}
</TableCell>

      <TableCell align="right">
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDelete(q.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </Paper>
    </Container>
  );
}

export default ManageQuestions;
