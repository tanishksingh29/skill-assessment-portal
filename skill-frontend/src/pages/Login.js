// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      if (!token) return alert("Login failed");

      localStorage.setItem('token', token);
      const user = jwtDecode(token);

      if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 5, borderRadius: 3, textAlign: 'center', backgroundColor: '#fff' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2575fc' }}>
            SmartSkill Portal
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: '#555', mb: 4 }}>
            Assess and track your skills with quizzes and performance reports
          </Typography>

          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#2575fc', ':hover': { backgroundColor: '#6a11cb' } }}
              onClick={handleLogin}
            >
              Login
            </Button>

            <Typography variant="body2">
              Don’t have an account?{" "}
              <Button variant="text" onClick={() => navigate('/user-register')}>
                Register here
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
