import { useCallback, useEffect, useState } from 'react';
import { userService } from '../services/userService';
import type { User } from '../types';

export function useUsers(page: number, search: string, gender: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError('');
    userService
      .getUsers({
        limit: 8,
        skip: (page - 1) * 8,
        search: search || undefined,
        gender: gender || undefined,
      })
      .then((data) => {
        setUsers(data.users);
        setTotal(data.total);
      })
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Unable to load users.'),
      )
      .finally(() => setLoading(false));
  }, [gender, page, search]);

  useEffect(() => {
    const request = async () => {
      await fetchUsers();
    };
    void request();
  }, [fetchUsers]);
  return { users, total, loading, error, refetch: fetchUsers };
}
