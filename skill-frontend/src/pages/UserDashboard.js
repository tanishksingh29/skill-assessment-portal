import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function UserDashboard() {
  const [skills, setSkills] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
    fetchAttempts();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      alert('Error fetching skills');
    }
  };

  const fetchAttempts = async () => {
    try {
      const res = await api.get('/quiz/history');
      setAttempts(res.data);
    } catch (err) {
      alert('Error fetching past attempts');
    }
  };

  const handleStartQuiz = (skillId) => {
    navigate(`/quiz/${skillId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const uniqueSkills = [...new Set(attempts.map((a) => a.skill_name))];
  const skillChartData = {
    labels: uniqueSkills,
    datasets: [
      {
        label: 'Average Score',
        data: uniqueSkills.map((skill) => {
          const filtered = attempts.filter((a) => a.skill_name === skill);
          const avg =
            filtered.reduce((sum, a) => sum + a.score, 0) / filtered.length;
          return Math.round(avg);
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const timeChartData = {
    labels: attempts.map((a) =>
      new Date(a.attempted_at).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Score (%)',
        data: attempts.map((a) => (a.score / a.total_questions) * 100),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">👤 User Dashboard</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Available Skills */}
      <Typography variant="h6" mb={2}>📚 Available Skills</Typography>
      <Grid container spacing={2} mb={4}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{skill.name}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => handleStartQuiz(skill.id)}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Past Quiz Attempts */}
      <Typography variant="h6" mb={2}>📊 Past Quiz Attempts</Typography>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Skill</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attempts.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.skill_name}</TableCell>
                  <TableCell>{a.score}</TableCell>
                  <TableCell>{a.total_questions}</TableCell>
                  <TableCell>{((a.score / a.total_questions) * 100).toFixed(1)}%</TableCell>
                  <TableCell>{new Date(a.attempted_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts */}
      {attempts.length > 0 && (
        <>
          <Typography variant="h6" mb={2}>📊 Performance by Skill</Typography>
          <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
            <Bar data={skillChartData} options={{ responsive: true }} />
          </Card>

          <Typography variant="h6" mb={2}>📈 Scores Over Time</Typography>
          <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
            <Line data={timeChartData} options={{ responsive: true }} />
          </Card>
        </>
      )}
    </Container>
  );
}

export default UserDashboard;
