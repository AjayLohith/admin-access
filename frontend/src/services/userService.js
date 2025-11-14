import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

const userService = {
  // Get all users (Admin only)
  getUsers: async (page = 1, limit = 10, search = '') => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_URL}/users`, {
      params: { page, limit, search },
      headers: headers.headers,
    });
    return response.data;
  },

  // Get single user (Admin only)
  getUser: async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`, getAuthHeaders());
    return response.data;
  },
};

export default userService;

