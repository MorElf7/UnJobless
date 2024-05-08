import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

interface LoginResponse {
  access_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/sign-in`, { email, password });
    const data = response.data;
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};