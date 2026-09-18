import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export class AppError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      new AppError(
        error.response?.data?.message ?? 'Unable to reach the user service.',
        error.response?.status,
      ),
    ),
);
