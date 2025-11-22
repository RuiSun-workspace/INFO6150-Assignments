import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Authentication Service
export const authService = {
  // Login function - validates credentials using backend
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      
      // Store user session
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      
      return { success: true, user: response.data.user };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Invalid email or password';
      throw new Error(errorMessage);
    }
  },

  // Logout function
  logout: () => {
    sessionStorage.removeItem('user');
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return sessionStorage.getItem('user') !== null;
  },

  // Get current user
  getCurrentUser: () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if current user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.type === 'admin';
  },

  // Check if current user is employee
  isEmployee: () => {
    const user = authService.getCurrentUser();
    return user && user.type === 'employee';
  }
};

// User API Service
export const userService = {
  // Get all users (for admin)
  getAllUsers: async () => {
    try {
      const response = await api.get('/user/getAll');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/user/create', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
};

// Job API Service
export const jobService = {
  // Get all jobs
  getAllJobs: async () => {
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  // Create new job (admin only)
  createJob: async (jobData) => {
    try {
      const response = await api.post('/create/job', jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create job';
      throw new Error(errorMessage);
    }
  },
};

export default api;
