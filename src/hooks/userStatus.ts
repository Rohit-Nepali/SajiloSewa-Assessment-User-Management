import type { User } from '../types';

export function getUserStatus(user: User): 'active' | 'inactive' {
  return (user as User & { status?: string }).status === 'inactive' ? 'inactive' : 'active';
}
