import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // Uncomment if backend supports CORS with credentials
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // Only add Authorization header if token exists and doesn't look like a session identifier
    if (token && !token.startsWith('session_')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (error.message === 'Network Error' || !error.response) {
      error.message = 'Network Error: Unable to connect to the server. Please check if the backend is running on http://localhost:3001';
    }
    return Promise.reject(error);
  }
);

// Admin APIs
export const adminAPI = {
  signup: async (email, password) => {
    const response = await api.post('/admin/signup', { email, password });
    // Check for token in response data or headers
    const token = response.data.token || 
                  response.data.accessToken || 
                  response.headers['authorization']?.replace('Bearer ', '') ||
                  response.headers['x-auth-token'] ||
                  response.headers['token'];
    return { ...response.data, token };
  },
  login: async (email, password) => {
    const response = await api.post('/admin/login', { email, password });
    // Check for token in response data or headers
    const token = response.data.token || 
                  response.data.accessToken || 
                  response.headers['authorization']?.replace('Bearer ', '') ||
                  response.headers['x-auth-token'] ||
                  response.headers['token'];
    return { ...response.data, token };
  },
};

// User APIs
export const userAPI = {
  signup: async (email, password) => {
    const response = await api.post('/user/signup', { email, password });
    // Check for token in response data or headers
    const token = response.data.token || 
                  response.data.accessToken || 
                  response.headers['authorization']?.replace('Bearer ', '') ||
                  response.headers['x-auth-token'] ||
                  response.headers['token'];
    return { ...response.data, token };
  },
  login: async (email, password) => {
    const response = await api.post('/user/login', { email, password });
    // Check for token in response data or headers
    const token = response.data.token || 
                  response.data.accessToken || 
                  response.headers['authorization']?.replace('Bearer ', '') ||
                  response.headers['x-auth-token'] ||
                  response.headers['token'];
    return { ...response.data, token };
  },
};

// Order APIs
export const orderAPI = {
  create: async (orderData) => {
    // orderData should contain: title, eventDate, venue, location, totalPrice, eventID, userId
    const response = await api.post('/order', orderData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/order');
    return response.data;
  },
  getByUserId: async (userId) => {
    const response = await api.get(`/order/user/${userId}`);
    return response.data;
  },
  delete: async (orderId) => {
    // Try different endpoint formats based on common REST patterns
    // First try: DELETE /api/order/:id (most common)
    try {
      const response = await api.delete(`/order/${orderId}`);
      return response.data;
    } catch (error) {
      // If 404, try query parameter format: DELETE /api/order?id=:id
      if (error.response?.status === 404) {
        try {
          const response = await api.delete(`/order`, { params: { id: orderId } });
          return response.data;
        } catch (err2) {
          // If still 404, try plural form: DELETE /api/orders/:id
          if (err2.response?.status === 404) {
            try {
              const response = await api.delete(`/orders/${orderId}`);
              return response.data;
            } catch (err3) {
              // Last try: POST to delete endpoint with body
              if (err3.response?.status === 404) {
                try {
                  const response = await api.post(`/order/delete`, { id: orderId });
                  return response.data;
                } catch (err4) {
                  console.error('Delete endpoint not found. Tried:', [
                    `DELETE /api/order/${orderId}`,
                    `DELETE /api/order?id=${orderId}`,
                    `DELETE /api/orders/${orderId}`,
                    `POST /api/order/delete`
                  ]);
                  throw err4;
                }
              }
              throw err3;
            }
          }
          throw err2;
        }
      }
      throw error;
    }
  },
};

export default api;

