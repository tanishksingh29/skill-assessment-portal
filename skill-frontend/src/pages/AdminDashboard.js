import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import { Logout } from '@mui/icons-material';

function AdminDashboard() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState({ name: 'Admin' }); 

  useEffect(() => {
    fetchSkills();
    // fetch user info if available
    const storedName = localStorage.getItem('name'); 
    if (storedName) setUser({ name: storedName });
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async () => {
    if (!name || !description) return alert('All fields are required');
    try {
      await api.post('/skills', { name, description });
      alert('Skill added!');
      setName('');
      setDescription('');
      fetchSkills();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add skill');
    }
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.href = '/';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h5">Welcome, {user.name}</Typography>
        </Box>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Add Skill */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>➕ Add New Skill</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Skill Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Box>
      </Paper>

      {/* Skill List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>📚 All Skills</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Skill Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.description}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteSkill(skill.id)}
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/admin/skills/${skill.id}/questions`}
                  >
                    Manage Questions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Reports Button */}
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="secondary" href="/admin/reports" size="large">
          📊 View Reports
        </Button>
      </Box>
    </Container>
  );
}

export default AdminDashboard;
