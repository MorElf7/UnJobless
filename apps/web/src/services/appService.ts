import axios from 'axios';

const API_URL = 'https://cs520-backend-kp1wd5z6t-kientos-projects.vercel.app';

export const fetchApps = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/applications/me?accepted=false`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    throw error;
  }
};