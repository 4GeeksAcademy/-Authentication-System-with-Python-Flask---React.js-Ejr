// src/services/api.js

import axios from 'axios';

const API_URL = process.env.BACKEND_URL || 'http://localhost:5000/api';

export const createPost = async (data) => {
  const response = await axios.post(`${API_URL}/posts`, data);
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/auth/register`, data);
  return response.data;
};
