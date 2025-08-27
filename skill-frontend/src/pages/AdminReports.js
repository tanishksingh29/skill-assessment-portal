import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
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
import { Bar, Line } from 'react-chartjs-2';

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

function AdminReports() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get('/reports/overall');
      setReport(res.data);
    } catch (err) {
      alert('Error loading reports');
    }
  };

  const uniqueSkills = [...new Set(report.map((r) => r.skill_name))];

  const skillGapData = {
    labels: uniqueSkills,
    datasets: [
      {
        label: 'Avg Score (%)',
        data: uniqueSkills.map((skill) => {
          const filtered = report.filter((r) => r.skill_name === skill);
          const avg =
            filtered.reduce((sum, r) => sum + (r.score / r.total_questions) * 100, 0) /
            filtered.length;
          return parseFloat(avg.toFixed(2));
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const timeData = {
    labels: report.map((r) =>
      new Date(r.attempted_at).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Score (%)',
        data: report.map((r) => (r.score / r.total_questions) * 100),
        borderColor: 'rgba(54, 162, 235, 0.9)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          📊 Admin Reports Dashboard
        </Typography>

        {/* User-wise Table */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            1️⃣ User-wise Report
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Skill</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Percentage</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.user_name}</TableCell>
                  <TableCell>{r.skill_name}</TableCell>
                  <TableCell>{r.score}</TableCell>
                  <TableCell>{r.total_questions}</TableCell>
                  <TableCell>
                    {((r.score / r.total_questions) * 100).toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    {new Date(r.attempted_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* Skill Gap Bar Chart */}
        <Box mt={6}>
          <Typography variant="h6" gutterBottom>
            2️⃣ Skill Gap Report (Avg Scores)
          </Typography>
          <Bar data={skillGapData} options={{ responsive: true }} />
        </Box>

        {/* Time-based Performance Line Chart */}
        <Box mt={6}>
          <Typography variant="h6" gutterBottom>
            3️⃣ Time-Based Performance (All Users)
          </Typography>
          <Line data={timeData} options={{ responsive: true }} />
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminReports;
