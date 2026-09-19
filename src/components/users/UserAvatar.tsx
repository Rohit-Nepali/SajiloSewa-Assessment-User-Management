import { useState } from 'react';
import type { User } from '../../types';

type UserAvatarProps = {
  user: User;
  className: string;
};

function initials(user: User) {
  return `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase();
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  if (!user.image || imageError) {
    return (
      <span
        className={`${className} inline-flex items-center justify-center bg-[var(--soft)] text-xs font-bold text-[var(--accent)]`}
        role="img"
        aria-label={`${user.firstName} ${user.lastName}`}
      >
        {initials(user)}
      </span>
    );
  }

  return (
    <img
      className={`${className} bg-[var(--soft)] object-cover`}
      src={user.image}
      alt={`${user.firstName} ${user.lastName}`}
      onError={() => setImageError(true)}
    />
  );
}