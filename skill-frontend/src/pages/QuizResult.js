import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';

function QuizResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) return <Typography>No result found</Typography>;

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>🎉 Quiz Result</Typography>
        <Typography>Skill: {result.skill}</Typography>
        <Typography>Date: {new Date(result.attempted_at).toLocaleString()}</Typography>
        <Typography>Score: {result.score}/{result.total} ({((result.score / result.total) * 100).toFixed(2)}%)</Typography>

        <Box mt={4}>
          <Typography variant="h6">Answer Review:</Typography>
          {result.answers.map((a, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography><strong>Q:</strong> {a.question}</Typography>
              <Typography color="primary">Your Answer: {a.selected}</Typography>
              <Typography color={a.selected === a.correct ? 'green' : 'error'}>Correct Answer: {a.correct}</Typography>
              <hr />
            </Box>
          ))}
        </Box>

        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Paper>
    </Container>
  );
}

export default QuizResult;
