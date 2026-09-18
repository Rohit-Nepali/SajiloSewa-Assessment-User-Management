import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { useState } from 'react';
import type { User } from '../types';
import { userService } from '../services/userService';
import { AppLink } from '../components/shared/Link';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { Select } from '../components/shared/Select';
import { EmptyState, ErrorState, LoadingState } from '../components/common/States';
import { Card } from '../components/shared/Card';
import { Badge } from '../components/shared/Badge';
import { IconButton } from '../components/shared/IconButton';
import { Stat } from '../components/shared/Stat';
import { Info } from '../components/shared/Info';

const page = 'mx-auto w-full max-w-[1180px] px-[6%] py-[62px] max-sm:px-5 max-sm:py-[35px]';
// const narrow = `${page} max-w-[950px]`;
const eyebrow = 'text-[11px] font-bold uppercase tracking-[0.12em] text-[#92a19a]';
const heading =
  'mb-3 mt-[11px] font-heading text-[clamp(34px,5vw,58px)] leading-none tracking-[-0.04em]';

export function UserListPage() {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') ?? '',
    gender = params.get('gender') ?? '',
    currentPage = Number(params.get('page') ?? 1);
  const { users, total, loading, error, refetch } = useUsers(currentPage, search, gender);
  const [deleting, setDeleting] = useState<number | null>(null);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setParams(next);
  };

  const deleteUser = (user: User) => {
    if (!window.confirm(`Delete ${user.firstName} ${user.lastName}?`)) return;
    setDeleting(user.id);
    userService
      .deleteUser(user.id)
      .then(refetch)
      .catch(() => window.alert('Delete failed. Please try again.'))
      .finally(() => setDeleting(null));
  };

  return (
    <section className={page}>
      <div className="flex items-end justify-between gap-[25px] max-sm:flex-col max-sm:items-start">
        <div>
          <span className={eyebrow}>People / Directory</span>
          <h1 className={heading}>All users</h1>
          <p className="mb-0 text-base text-[var(--muted)]">
            A clear view of the people shaping your workspace.
          </p>
        </div>
        <AppLink to="/users/new">
          <Button>＋ Add user</Button>
        </AppLink>
      </div>
      <div className="my-6 mt-[55px] flex gap-20 border-y border-[var(--line)] py-5 max-sm:mt-[35px] max-sm:justify-between max-sm:gap-5">
        <Stat value={total || '—'} label="Total profiles" />
        <Stat value="Active" label="Directory status" />
        <Stat
          value={gender ? gender[0].toUpperCase() + gender.slice(1) : 'All'}
          label="Current filter"
        />
      </div>
      <div className="mb-[25px] flex gap-2.5 max-sm:flex-wrap">
        <label className="flex min-w-0 flex-1 items-center gap-[9px] rounded-[7px] border border-[var(--line)] bg-[var(--panel)] px-[13px]">
          <span className="text-2xl text-[var(--muted)]">⌕</span>
          <Input
            aria-label="Search users"
            value={search}
            onChange={(event) => update('search', event.target.value)}
            placeholder="Search by name or email..."
            className="min-h-[43px] border-0 pl-0 focus:ring-0"
          />
        </label>
        <Select
          aria-label="Filter by gender"
          value={gender}
          onChange={(event) => update('gender', event.target.value)}
          className="max-w-40 max-sm:max-w-none max-sm:flex-1"
        >
          <option value="">All genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </Select>
        {(search || gender) && (
          <Button variant="ghost" size="sm" onClick={() => setParams({ page: '1' })}>
            Clear filters
          </Button>
        )}
      </div>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} retry={refetch} />
      ) : users.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-[15px] sm:grid-cols-2 lg:grid-cols-4">
            {users.map((user) => (
              <Card key={user.id}>
                <div className="flex items-start justify-between">
                  <img
                    className="h-16 w-16 rounded-full bg-[var(--soft)] object-cover"
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <Badge>Active</Badge>
                </div>
                <h2 className="mb-[3px] mt-[22px] text-[19px]">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-[13px] text-[var(--muted)]">{user.company.title}</p>
                <dl className="my-5 border-t border-[var(--line)] pt-[13px]">
                  <Info label="Email" value={user.email} />
                  <Info label="Company" value={user.company.name} />
                </dl>
                <div className="flex items-center gap-[13px] border-t border-[var(--line)] pt-[15px] text-xs">
                  <AppLink to={`/users/${user.id}`} className="flex-1 text-[13px] font-bold">
                    View profile <span className="text-lg text-[var(--accent)]">→</span>
                  </AppLink>
                  <AppLink to={`/users/${user.id}/edit`}>Edit</AppLink>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteUser(user)}
                    disabled={deleting === user.id}
                  >
                    {deleting === user.id ? '...' : 'Delete'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-[13px] text-[var(--muted)] max-sm:flex-col max-sm:items-start max-sm:gap-[15px]">
            <span>
              Showing {(currentPage - 1) * 8 + 1}–{Math.min(currentPage * 8, total)} of {total}
            </span>
            <div className="flex items-center gap-3">
              <IconButton
                aria-label="Previous page"
                disabled={currentPage <= 1}
                onClick={() => update('page', String(currentPage - 1))}
              >
                ←
              </IconButton>
              <b>Page {currentPage}</b>
              <IconButton
                aria-label="Next page"
                disabled={currentPage * 8 >= total}
                onClick={() => update('page', String(currentPage + 1))}
              >
                →
              </IconButton>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
