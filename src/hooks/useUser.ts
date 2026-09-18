import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { userQueryKeys } from './useUsers';

export function useUser(id: string) {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: Boolean(id),
  });
}