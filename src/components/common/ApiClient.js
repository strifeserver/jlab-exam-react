import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', {
          email: email,
          password: password
        });
        const { access_token } = response.data.result;
        return { accessToken: access_token, response }; 
      } catch (error) {
        console.error('Login error:', error);
        throw error; 
      }
  };

const register = async (userData) => {
  try {

      const response = await apiClient.post('/register', userData);
      console.log('Registration response:', response.data);
      return { response }; 
  } catch (error) {
    console.error('Registration error:', error);
  }
};
const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.put('/update_profile', userData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log('Update profile response:', response.data);
    return { response }; 
  } catch (error) {
    console.error('Update profile error:', error);
    throw error; 
  }
};

const validateToken = async (token = '') => {
  if(token == ''){
    token = localStorage.getItem('token');
  }

  try {
    const response = await apiClient.get('/protected-route', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export { login, register, validateToken, updateProfile };
