import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

function QuizPage() {
  const { skillId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await api.get(`/quiz/start/${skillId}`);
    setQuestions(res.data);
  };

  const handleOptionChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      skillId: parseInt(skillId),
      answers: Object.entries(answers).map(([qId, selectedOption]) => ({
        questionId: parseInt(qId),
        selectedOption,
      })),
    };

    const res = await api.post('/quiz/submit', payload);
    navigate('/quiz-result', { state: { result: res.data } });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>📝 Quiz</Typography>

      {questions.map((q, index) => (
  <Paper key={q.id} sx={{ p: 2, mb: 2 }}>
    <Typography variant="h6">
      {index + 1}. {q.question}
    </Typography>
    <RadioGroup
      value={answers[q.id] || ''}
      onChange={(e) => handleOptionChange(q.id, e.target.value)}
    >
      {q.options.map((opt, idx) => (
        <FormControlLabel
          key={idx}
          value={opt}
          control={<Radio />}
          label={opt}
        />
      ))}
    </RadioGroup>
  </Paper>
))}


      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3 }}>
        Submit Quiz
      </Button>
    </Container>
  );
}

export default QuizPage;
