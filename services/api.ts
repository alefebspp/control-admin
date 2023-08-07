import { AppError } from '@/lib/AppError';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_SERVER
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError('Error no servidor.Tente novamente mais tarde')
      );
    }
  }
);
