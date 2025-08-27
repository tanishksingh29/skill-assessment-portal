// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const user = jwtDecode(token); 
    if (user.role !== role) return <Navigate to="/" />;
    return children;
  } catch (err) {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
