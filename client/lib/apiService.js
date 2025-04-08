import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

// Fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};




// User login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

// Create order
export const createOrder = async (orderData, token) => {
  const response = await axios.post(`${API_URL}/orders`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

