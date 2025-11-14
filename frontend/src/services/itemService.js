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

const itemService = {
  // Get items with search and pagination
  getItems: async (page = 1, limit = 10, search = '') => {
    const headers = getAuthHeaders();
    const response = await axios.get(`${API_URL}/items`, {
      params: { page, limit, search },
      headers: headers.headers,
    });
    return response.data;
  },

  // Get single item
  getItem: async (id) => {
    const response = await axios.get(`${API_URL}/items/${id}`, getAuthHeaders());
    return response.data;
  },

  // Create item
  createItem: async (itemData) => {
    const response = await axios.post(`${API_URL}/items`, itemData, getAuthHeaders());
    return response.data;
  },

  // Update item
  updateItem: async (id, itemData) => {
    const response = await axios.put(`${API_URL}/items/${id}`, itemData, getAuthHeaders());
    return response.data;
  },

  // Delete item
  deleteItem: async (id) => {
    const response = await axios.delete(`${API_URL}/items/${id}`, getAuthHeaders());
    return response.data;
  },
};

export default itemService;

