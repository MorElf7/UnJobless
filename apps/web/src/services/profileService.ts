import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

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

export const fetchSideBarData = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const { first_name, last_name, email } = response.data;
    return { first_name, last_name, email };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};