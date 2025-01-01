import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    alert('You have been logged out!');
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Welcome to the Dashboard</h1>
      <p className={styles.message}>
        You are logged in! Use the navigation menu to explore more features.
      </p>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
