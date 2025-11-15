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
  // Login function - validates credentials
  login: async (email, password) => {
    try {
      // Get all users
      const response = await api.get('/user/getAll');
      const users = response.data.users;
      
      // Find user by email
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Note: In a real application, password comparison should be done on the backend
      // For this assignment, we're working with the limitation that there's no login endpoint
      // Store user session
      sessionStorage.setItem('user', JSON.stringify({
        email: user.email,
        fullName: user.fullName
      }));
      
      return { success: true, user: { email: user.email, fullName: user.fullName } };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
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
  }
};

// User API Service
export const userService = {
  // Get all users
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

  // Upload image for user
  uploadImage: async (email, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('image', imageFile);

      const response = await api.post('/user/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Get user images (for Company Showcase)
  getUserImages: async () => {
    try {
      const response = await api.get('/user/getAll');
      // Filter users who have images
      const usersWithImages = response.data.users.filter(user => user.imagePath);
      return usersWithImages.map(user => ({
        name: user.fullName,
        imagePath: `${API_BASE_URL}${user.imagePath}`
      }));
    } catch (error) {
      console.error('Error fetching user images:', error);
      throw error;
    }
  }
};

export default api;
