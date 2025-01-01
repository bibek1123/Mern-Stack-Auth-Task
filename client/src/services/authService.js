import axios from 'axios';

export const registerUser = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data);
};
