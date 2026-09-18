import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { User } from '../types';

export const userQueryKeys = {
  all: ['users'] as const,
  lists: () => [...userQueryKeys.all, 'list'] as const,
  list: (page: number, search: string, gender: string) =>
    [...userQueryKeys.lists(), { page, search, gender }] as const,
  details: () => [...userQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};

export function useUsers(page: number, search: string, gender: string) {
  const query = useQuery({
    queryKey: userQueryKeys.list(page, search, gender),
    queryFn: () =>
      userService.getUsers({
        limit: 8,
        skip: (page - 1) * 8,
        search: search || undefined,
        gender: gender || undefined,
      })
  });

  return {
    users: query.data?.users ?? ([] as User[]),
    total: query.data?.total ?? 0,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : query.error ? 'Unable to load users.' : '',
    refetch: query.refetch,
  };
}
