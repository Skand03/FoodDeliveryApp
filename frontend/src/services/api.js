import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  checkEmail: (email) => api.get(`/auth/check-email?email=${email}`),
  getAllUsers: () => api.get('/auth/users'),
  getUserById: (id) => api.get(`/auth/users/${id}`),
  logout: () => {
    localStorage.removeItem('user');
  }
};

export const restaurantAPI = {
  getAll: () => api.get('/restaurants'),
  getById: (id) => api.get(`/restaurants/${id}`),
  getFeatured: () => api.get('/restaurants/featured'),
  search: (query) => api.get(`/restaurants/search?query=${query}`)
};

export const menuAPI = {
  getByRestaurant: (restaurantId) => api.get(`/menu/restaurant/${restaurantId}`),
  getById: (id) => api.get(`/menu/${id}`)
};

export const cartAPI = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  addToCart: (data) => api.post('/cart/add', data),
  updateItem: (cartItemId, quantity) => api.put(`/cart/${cartItemId}?quantity=${quantity}`),
  removeItem: (cartItemId) => api.delete(`/cart/${cartItemId}`),
  clearCart: (userId) => api.delete(`/cart/clear/${userId}`)
};

export const orderAPI = {
  create: (orderData) => api.post('/orders/create', orderData),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getById: (orderId) => api.get(`/orders/${orderId}`)
};

export default api;