import axios from 'axios';

const API_URL = 'https://cs520-backend-kp1wd5z6t-kientos-projects.vercel.app';

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    throw error;
  }
};