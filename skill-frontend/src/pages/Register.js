// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (secretCode !== 'ADMIN') {
      alert('Unauthorized access');
      return;
    }

    try {
      await api.post('/auth/register', {
        name,
        email,
        password,
        role: 'admin',
      });
      alert('Admin Registered successfully');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Registration
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          <TextField label="Secret Code" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleRegister}>Register as Admin</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
