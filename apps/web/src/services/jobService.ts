import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

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