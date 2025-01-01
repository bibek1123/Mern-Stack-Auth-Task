import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/authSlice';

// Import Components
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<h1>Welcome to the FReact App</h1>} />
          
          {/* Protected Route - Dashboard */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Login />}
          />
          
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Redirect to Login if route is invalid */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
