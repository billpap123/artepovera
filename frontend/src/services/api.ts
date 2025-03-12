// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:50001/api'; // Adjust the URL based on your backend

export const createUser = async (userData: any) => {
    return axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (email: string, password: string) => {
    return axios.post(`${API_URL}/users/login`, { email, password });
};

// Add other API calls as needed
