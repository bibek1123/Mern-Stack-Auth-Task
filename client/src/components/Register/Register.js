import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/authService';
import { login } from '../../features/authSlice'
import styles from './Register.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await registerUser(formData);
      const { token, user } = response.data;

      dispatch(login({ user, token }));
      localStorage.setItem('token', token);
      setSuccess(true);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      const errorMessages = Array.isArray(err.response?.data?.errors)
      ? err.response.data.errors.map((error) => error.msg).join(", ")
      : 'Login failed';

    setError(errorMessages);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.heading}>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Registration successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            id="name"
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
