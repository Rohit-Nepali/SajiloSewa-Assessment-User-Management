import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserInput, UsersResponse } from '../types';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';

type UserListFilters = { page: number; search: string; gender: string };

function matchesList(user: User, filters: UserListFilters) {
  const search = filters.search.toLowerCase();
  const matchesSearch = !search || `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(search);
  const matchesGender = !filters.gender || user.gender === filters.gender;
  return matchesSearch && matchesGender;
}

function updateCachedUserLists(
  queryClient: ReturnType<typeof useQueryClient>,
  update: (users: User[], total: number, filters: UserListFilters) => UsersResponse,
) {
  queryClient.getQueriesData<UsersResponse>({ queryKey: userQueryKeys.lists() }).forEach(([queryKey, data]) => {
    if (!data) return;
    const filters = queryKey[2] as UserListFilters;
    queryClient.setQueryData(queryKey, update(data.users, data.total, filters));
  });
}

// Optimistic cache updates keep the UI coherent even when the write API is simulated.
function cacheUpdatedUser(queryClient: ReturnType<typeof useQueryClient>, user: User) {
  queryClient.setQueryData(userQueryKeys.detail(String(user.id)), user);
  updateCachedUserLists(queryClient, (users, total, filters) => {
    const exists = users.some((item) => item.id === user.id);
    const matches = matchesList(user, filters);
    const nextUsers = matches
      ? exists
        ? users.map((item) => item.id === user.id ? user : item)
        : filters.page === 1 ? [user, ...users].slice(0, 8) : users
      : users.filter((item) => item.id !== user.id);
    return {
      users: nextUsers,
      total: total + (!exists && matches ? 1 : exists && !matches ? -1 : 0),
      skip: (filters.page - 1) * 8,
      limit: 8,
    };
  });
}

function cacheRemovedUsers(queryClient: ReturnType<typeof useQueryClient>, ids: number[]) {
  const removed = new Set(ids);
  ids.forEach((id) => queryClient.setQueryData(userQueryKeys.detail(String(id)), null));
  updateCachedUserLists(queryClient, (users, total, filters) => ({
    users: users.filter((user) => !removed.has(user.id)),
    total: Math.max(0, total - users.filter((user) => removed.has(user.id)).length),
    skip: (filters.page - 1) * 8,
    limit: 8,
  }));
}

function markUserQueriesStale(queryClient: ReturnType<typeof useQueryClient>) {
  // DummyJSON writes succeed but are not persisted for a follow-up GET.
  return queryClient.invalidateQueries({ queryKey: userQueryKeys.all, refetchType: 'none' });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UserInput) => userService.createUser(data),
    onSuccess: (user) => {
      cacheUpdatedUser(queryClient, user);
      void markUserQueriesStale(queryClient);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserInput }) => userService.updateUser(id, data),
    onSuccess: (user) => {
      cacheUpdatedUser(queryClient, user);
      void markUserQueriesStale(queryClient);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: (_deletedUser, id) => {
      cacheRemovedUsers(queryClient, [id]);
      void markUserQueriesStale(queryClient);
    },
  });
}

export function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids: number[]) => Promise.all(ids.map((id) => userService.deleteUser(id))),
    onSuccess: (_deletedUsers, ids) => {
      cacheRemovedUsers(queryClient, ids);
      void markUserQueriesStale(queryClient);
    },
  });
}