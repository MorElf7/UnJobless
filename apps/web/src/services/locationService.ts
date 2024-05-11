import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchSchools = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/schools/${name}`);
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch schools', error);
    return [];
  }
};

export const fetchCompanies = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${name}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch companies', error);
    return [];
  }
};
