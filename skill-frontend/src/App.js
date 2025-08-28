// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserRegister from './pages/UserRegister';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import QuizPage from './pages/QuizPage';
import ProtectedRoute from './components/ProtectedRoute';
import ManageQuestions from './pages/ManageQuestions';
import AdminReports from './pages/AdminReports';
import QuizResult from './pages/QuizResult';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />          {/* Admin only */}
        <Route path="/user-register" element={<UserRegister />} /> {/* Public */}

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}
        />
        <Route
          path="/quiz/:skillId"
          element={<ProtectedRoute role="user"><QuizPage /></ProtectedRoute>}
        />
        <Route
  path="/admin/skills/:skillId/questions"
  element={<ProtectedRoute role="admin"><ManageQuestions /></ProtectedRoute>}
/>
<Route
  path="/admin/reports"
  element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>}
/>
<Route path="/quiz-result" element={<ProtectedRoute><QuizResult /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
