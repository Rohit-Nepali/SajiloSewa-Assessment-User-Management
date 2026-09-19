import { useEffect, useState } from 'react';
import { Check, Eye, Pencil, Search, Trash2, UserPlus, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types';
import { useDeleteUsers } from '../hooks/useUserMutations';
import { Button } from '../components/shared/Button';
import { Input } from '../components/shared/Input';
import { Select } from '../components/shared/Select';
import { EmptyState, ErrorState, LoadingState } from '../components/common/States';
import { IconButton } from '../components/shared/IconButton';
import { Typography } from '../components/shared/Typography';
import { UserPanel } from '../components/users/UserPanel';
import { UserAvatar } from '../components/users/UserAvatar';
import { getUserStatus } from '../hooks/userStatus';

const page = 'mx-auto w-full max-w-[1180px] px-6 sm:px-8 lg:px-4 py-8 sm:py-12 lg:py-16';

type PanelAction = 'view' | 'edit' | 'delete';

export function UserListPage() {
  const [params, setParams] = useSearchParams();

  const search = params.get('search') ?? '';
  const gender = params.get('gender') ?? '';
  const currentPage = Number(params.get('page') ?? 1);

  const { users, total, loading, error, refetch } = useUsers(currentPage, search, gender);

  const [searchInput, setSearchInput] = useState(search);
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [panelUser, setPanelUser] = useState<User | null>(null);
  const [panelAction, setPanelAction] = useState<PanelAction>('view');
  const [panelOpen, setPanelOpen] = useState(false);
  const [toast, setToast] = useState('');

  const deleteUsers = useDeleteUsers();

  /*
   * Keep the input synchronized with the URL.
   *
   * This matters for:
   * - browser back/forward
   * - refresh/deep links
   * - clearing filters
   */
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  /*
   * Debounce only the search input.
   *
   * Typing:
   * "john"
   *
   * does NOT immediately update the URL four times.
   * The URL is updated once after 400ms of inactivity.
   */
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchInput === search) return;

      const next = new URLSearchParams(params);

      if (searchInput) {
        next.set('search', searchInput);
      } else {
        next.delete('search');
      }

      next.set('page', '1');
      setParams(next);
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchInput, search, params, setParams]);

  useEffect(() => {
    if (!toast) return undefined;

    const timeout = window.setTimeout(() => setToast(''), 2200);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const update = (key: string, value: string) => {
    setSelected([]);

    const next = new URLSearchParams(params);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    next.set('page', '1');
    setParams(next);
  };

  const visibleUsers = status ? users.filter((user) => getUserStatus(user) === status) : users;

  const activeCount = users.filter((user) => getUserStatus(user) === 'active').length;

  const pageCount = Math.max(1, Math.ceil(total / 8));

  const allVisibleSelected =
    visibleUsers.length > 0 && visibleUsers.every((user) => selected.includes(user.id));

  const openPanel = (user: User | null, action: PanelAction) => {
    setPanelUser(user);
    setPanelAction(action);
    setPanelOpen(true);
  };

  const closePanel = () => setPanelOpen(false);

  const deleteSelected = () => {
    deleteUsers
      .mutateAsync(selected)
      .then(() => {
        setSelected([]);
        setToast(`${selected.length} users deleted`);
      })
      .catch(() => setToast('Delete failed. Please try again.'));
  };

  return (
    <section className={page}>
      <div className="flex items-end justify-between gap-[25px] max-sm:flex-col max-sm:items-start">
        <div>
          {/* <Typography size="xs" weight="bold" tone="subtle" className="uppercase tracking-[0.12em]">
            People / Directory
          </Typography> */}

          <Typography
            as="h1"
            size="display"
            weight="bold"
            className="mb-3 mt-[11px] font-heading tracking-[-0.04em]"
          >
            All users
          </Typography>

          <Typography tone="muted" className="mb-0">
            A clear view of the people shaping your workspace.
          </Typography>
        </div>

        <Button onClick={() => openPanel(null, 'edit')}>
          <UserPlus size={16} aria-hidden="true"  className="mr-2"/>
          Add user
        </Button>
      </div>

      <div className="my-6 mt-[55px] grid grid-cols-3 divide-x divide-[var(--line)] rounded-[10px] border border-[var(--line)] bg-[var(--panel)] py-5 max-sm:mt-[35px]">
        <div className="px-5 max-sm:px-3">
          <Typography as="strong" size="2xl" weight="bold" className="block max-sm:text-lg">
            {total || '—'}
          </Typography>

          <Typography size="xs" tone="muted" className="mt-1 block">
            Total profiles
          </Typography>
        </div>

        <div className="px-5 max-sm:px-3">
          <Typography
            as="strong"
            size="2xl"
            weight="bold"
            tone="accent"
            className="block max-sm:text-lg"
          >
            {activeCount}
          </Typography>

          <Typography size="xs" tone="muted" className="mt-1 block">
            Active count
          </Typography>
        </div>

        <div className="px-5 max-sm:px-3">
          <Typography
            as="strong"
            size="2xl"
            weight="bold"
            className="block capitalize max-sm:text-lg"
          >
            {gender || 'All'}
          </Typography>

          <Typography size="xs" tone="muted" className="mt-1 block">
            Current filter
          </Typography>
        </div>
      </div>

      <div className="mb-4 flex gap-2.5 max-sm:flex-wrap">
        <label className="flex min-w-0 flex-1 items-center gap-[9px] rounded-[7px] border border-[var(--line)] bg-[var(--panel)] px-[13px]">
          <Search size={19} className="shrink-0 text-[var(--muted)]" aria-hidden="true" />

          <Input
            aria-label="Search users"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
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

        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => {
            setSelected([]);
            setStatus(event.target.value);
          }}
          className="max-w-40 max-sm:max-w-none max-sm:flex-1"
        >
          <option value="">All status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>

        {(search || gender || status) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelected([]);
              setSearchInput('');
              setStatus('');
              setParams({ page: '1' });
            }}
          >
            <X size={15} aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>

      {selected.length > 0 && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-[#b8d8ff] bg-[var(--soft)] px-4 py-3">
          <Typography size="sm" weight="semibold" tone="accent">
            {selected.length} selected
          </Typography>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
              Clear
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={deleteSelected}
              disabled={deleteUsers.isPending}
            >
              <Trash2 size={14} />
              Delete selected
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} retry={refetch} />
      ) : visibleUsers.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="overflow-x-auto rounded-[10px] border border-[var(--line)] bg-[var(--panel)]">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead className="bg-[var(--soft)]">
                <tr className="border-b border-[var(--line)]">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allVisibleSelected}
                      onChange={(event) =>
                        setSelected(event.target.checked ? visibleUsers.map((user) => user.id) : [])
                      }
                      aria-label="Select all visible users"
                    />
                  </th>

                  <th className="px-4 py-3">
                    <Typography size="xs" weight="semibold" tone="muted">
                      Name
                    </Typography>
                  </th>

                  <th className="hidden px-4 py-3 lg:table-cell">
                    <Typography size="xs" weight="semibold" tone="muted">
                      Email
                    </Typography>
                  </th>

                  <th className="hidden px-4 py-3 lg:table-cell">
                    <Typography size="xs" weight="semibold" tone="muted">
                      Company
                    </Typography>
                  </th>

                  <th className="px-4 py-3">
                    <Typography size="xs" weight="semibold" tone="muted">
                      Status
                    </Typography>
                  </th>

                  <th className="px-4 py-3 text-right">
                    <Typography size="xs" weight="semibold" tone="muted">
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleUsers.map((user) => {
                  const userStatus = getUserStatus(user);

                  return (
                    <tr
                      key={user.id}
                      className="cursor-pointer border-b border-[var(--line)] last:border-0 hover:bg-[var(--soft)]"
                      onClick={() => openPanel(user, 'view')}
                    >
                      <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selected.includes(user.id)}
                          onChange={() =>
                            setSelected((current) =>
                              current.includes(user.id)
                                ? current.filter((id) => id !== user.id)
                                : [...current, user.id],
                            )
                          }
                          aria-label={`Select ${user.firstName} ${user.lastName}`}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={user} className="h-9 w-9 shrink-0 rounded-full" />

                          <span className="min-w-0">
                            <Typography
                              as="strong"
                              size="sm"
                              weight="bold"
                              className="block truncate"
                            >
                              {user.firstName} {user.lastName}
                            </Typography>

                            <Typography size="xs" tone="muted" className="mt-0.5 block truncate">
                              {user.company.title}
                            </Typography>
                          </span>
                        </div>
                      </td>

                      <td className="hidden px-4 py-3 lg:table-cell">
                        <Typography size="sm" tone="muted" className="truncate">
                          {user.email}
                        </Typography>
                      </td>

                      <td className="hidden px-4 py-3 lg:table-cell">
                        <Typography size="sm" tone="muted" className="truncate">
                          {user.company.name}
                        </Typography>
                      </td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--soft)] px-2.5 py-1 text-xs font-semibold">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              userStatus === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />

                          {userStatus === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <button
                            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                            onClick={() => openPanel(user, 'view')}
                            aria-label={`View ${user.firstName} ${user.lastName}`}
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
                            onClick={() => openPanel(user, 'edit')}
                            aria-label={`Edit ${user.firstName} ${user.lastName}`}
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--danger-soft)] hover:text-[var(--danger-ink)]"
                            onClick={() => openPanel(user, 'delete')}
                            aria-label={`Delete ${user.firstName} ${user.lastName}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between text-[13px] text-[var(--muted)] max-sm:flex-col max-sm:items-start max-sm:gap-[15px]">
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

              <Typography as="b" size="sm" weight="semibold">
                Page {currentPage} of {pageCount}
              </Typography>

              <IconButton
                aria-label="Next page"
                disabled={currentPage >= pageCount}
                onClick={() => update('page', String(currentPage + 1))}
              >
                →
              </IconButton>
            </div>
          </div>
        </>
      )}

      <UserPanel
        user={panelUser}
        open={panelOpen}
        action={panelAction}
        onClose={closePanel}
        onClosed={() => setPanelUser(null)}
        onSaved={setToast}
        onDeleted={(message) => {
          closePanel();
          setToast(message);
        }}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm text-[var(--panel)] shadow-lg">
          <Check size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </section>
  );
}
