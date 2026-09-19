import { apiClient } from './apiClient';
import type { User, UserInput, UsersResponse } from '../types';

export const userService = {
  getUsers: (
    params: {
      limit: number;
      skip: number;
      search?: string;
      gender?: string;
    },
    signal?: AbortSignal,
  ) =>
    apiClient
      .get<UsersResponse>(
        params.search
          ? '/users/search'
          : params.gender
            ? `/users/filter?key=gender&value=${params.gender}`
            : '/users',
        {
          params: {
            limit: params.limit,
            skip: params.skip,
            ...(params.search ? { q: params.search } : {}),
          },
          signal,
        },
      )
      .then((response) => response.data),

  getUserById: (id: string) =>
    apiClient.get<User>(`/users/${id}`).then((response) => response.data),

  createUser: (data: UserInput) =>
    apiClient.post<User>('/users/add', data).then((response) => response.data),

  updateUser: (id: string, data: UserInput) =>
    apiClient.put<User>(`/users/${id}`, data).then((response) => response.data),

  deleteUser: (id: number) =>
    apiClient.delete<User>(`/users/${id}`).then((response) => response.data),
};