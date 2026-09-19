import { useEffect, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import type { User } from '../../types';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { Select } from '../shared/Select';
import { Typography } from '../shared/Typography';
import { useCreateUser, useDeleteUser, useUpdateUser } from '../../hooks/useUserMutations';
import {
  formValuesToUserInput,
  userFieldRules,
  userFormDefaults,
  userToFormValues,
  type UserFormValues,
} from '../../forms/userForm';

type PanelMode = 'view' | 'edit';
type PanelAction = 'view' | 'edit' | 'delete';
type UserPanelProps = {
  user: User | null;
  open: boolean;
  action?: PanelAction;
  onClose: () => void;
  onClosed: () => void;
  onSaved: (message: string) => void;
  onDeleted: (message: string) => void;
};

export function UserPanel({
  user,
  open,
  action = 'view',
  onClose,
  onClosed,
  onSaved,
  onDeleted,
}: UserPanelProps) {
  const [createdUser, setCreatedUser] = useState<User | null>(null);
  const displayUser = user ?? createdUser;
  const isNew = !displayUser;
  const [mode, setMode] = useState<PanelMode>(action === 'edit' || isNew ? 'edit' : 'view');
  const [confirmDelete, setConfirmDelete] = useState(action === 'delete');
  const [error, setError] = useState('');
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: userFormDefaults,
  });
  const formValues = useWatch({ control });
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  useEffect(() => {
    // Reset the controlled panel form when its externally selected user/action changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCreatedUser(null);
    setMode(action === 'edit' || !user ? 'edit' : 'view');
    reset(userToFormValues(user ?? undefined));
    setConfirmDelete(action === 'delete');
    setError('');
  }, [action, reset, user]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose, open]);

  const save = (values: UserFormValues) => {
    setError('');
    const payload = formValuesToUserInput(values, displayUser ?? undefined);
    const creating = !displayUser;
    const request = displayUser
      ? updateUser.mutateAsync({ id: String(displayUser.id), data: payload })
      : createUser.mutateAsync(payload);
    request
      .then((savedUser) => {
        if (!user) {
          setCreatedUser(savedUser);
          reset(userToFormValues(savedUser));
        }
        setMode('view');
        onSaved(creating ? 'User created successfully' : 'User details saved');
      })
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Could not save user.'),
      );
  };

  const deleteCurrentUser = () => {
    if (!displayUser) return;
    deleteUser
      .mutateAsync(displayUser.id)
      .then(() => onDeleted('User deleted successfully'))
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Delete failed. Please try again.'),
      );
  };

  const field = (label: string, key: keyof UserFormValues, fullWidth = false) => (
    <label className={`${fullWidth ? 'sm:col-span-2' : ''} flex flex-col gap-1.5`}>
      <Typography as="span" size="xs" weight="semibold" tone="muted">
        {label}
      </Typography>
      <Input
        type={key === 'age' ? 'number' : key === 'email' ? 'email' : 'text'}
        {...register(
          key,
          key === 'firstName'
            ? userFieldRules.firstName
            : key === 'lastName'
              ? userFieldRules.lastName
              : key === 'email'
                ? userFieldRules.email
                : key === 'age'
                  ? {
                      valueAsNumber: true,
                      min: { value: 1, message: 'Age must be at least 1.' },
                      max: { value: 120, message: 'Age must be 120 or less.' },
                    }
                  : undefined,
        )}
      />
      {errors[key] && (
        <Typography size="xs" tone="danger">
          {errors[key]?.message}
        </Typography>
      )}
    </label>
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[440px] max-w-[92vw] flex-col border-l border-[var(--line)] bg-[var(--panel)] shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        onTransitionEnd={(event) => {
          if (!open && event.propertyName === 'transform') onClosed();
        }}
        aria-label={
          isNew
            ? 'Add a new user'
            : `User details for ${displayUser.firstName} ${displayUser.lastName}`
        }
      >
        <div className="flex items-start justify-between border-b border-[var(--line)] px-6 py-5">
          <div className="flex min-w-0 items-center gap-3">
            {displayUser ? (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--soft)] font-bold text-[var(--ink)]">
                {displayUser.firstName[0]}
                {displayUser.lastName[0]}
              </div>
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--soft)] text-[var(--accent)]">
                <Pencil size={18} />
              </div>
            )}
            <div className="min-w-0">
              <Typography as="h2" size="lg" weight="bold" className="truncate">
                {isNew ? 'Add a new user' : `${displayUser.firstName} ${displayUser.lastName}`}
              </Typography>
              <Typography size="sm" tone="muted" className="truncate">
                {isNew ? 'Create a profile' : displayUser.company.title}
              </Typography>
            </div>
          </div>
          <button
            className="ml-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--muted)] hover:bg-[var(--soft)] hover:text-[var(--ink)]"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {mode === 'view' ? (
            <>
              <Button size="sm" variant="secondary" onClick={() => setMode('edit')}>
                <Pencil size={14} /> Edit details
              </Button>
              <Typography as="h3" size="sm" weight="bold" className="mb-3 mt-6">
                Basic information
              </Typography>
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {(
                  [
                    ['First name', formValues.firstName],
                    ['Last name', formValues.lastName],
                    ['Email', formValues.email],
                    ['Phone', formValues.phone],
                    ['Username', formValues.username],
                    ['Company', formValues.company],
                    ['Gender', formValues.gender],
                    ['Age', String(formValues.age)],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className={label === 'Email' || label === 'Company' ? 'col-span-2' : ''}
                  >
                    <Typography size="xs" tone="muted">
                      {label}
                    </Typography>
                    <Typography size="sm" weight="semibold" className="mt-1 break-words">
                      {value || '—'}
                    </Typography>
                  </div>
                ))}
              </div>
              <Typography as="h3" size="sm" weight="bold" className="mb-3 mt-7">
                Additional details
              </Typography>
              <div className="flex items-center justify-between border-b border-[var(--line)] py-2.5">
                <Typography size="sm" tone="muted">
                  Status
                </Typography>
                <Typography
                  size="sm"
                  weight="semibold"
                  tone={formValues.status === 'active' ? 'accent' : 'danger'}
                >
                  {formValues.status === 'active' ? 'Active' : 'Inactive'}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Typography as="h3" size="sm" weight="bold" className="mb-3">
                Basic information
              </Typography>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {field('First name', 'firstName')}
                {field('Last name', 'lastName')}
                {field('Email', 'email', true)}
                {field('Phone', 'phone')}
                {field('Username', 'username')}
                {field('Company', 'company', true)}
                <label className="flex flex-col gap-1.5">
                  <Typography as="span" size="xs" weight="semibold" tone="muted">
                    Gender
                  </Typography>
                  <Select {...register('gender')}>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </Select>
                </label>
                {field('Age', 'age')}
                <label className="flex flex-col gap-1.5 sm:col-span-2">
                  <Typography as="span" size="xs" weight="semibold" tone="muted">
                    Status
                  </Typography>
                  <Select {...register('status')}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </label>
              </div>
              {error && (
                <Typography
                  tone="danger"
                  size="sm"
                  className="mt-4 rounded-md bg-[var(--danger-soft)] p-3"
                  role="alert"
                >
                  {error}
                </Typography>
              )}
            </>
          )}

          {!isNew && mode === 'view' && (
            <div className="mt-8 border-t border-[var(--line)] pt-5">
              <Typography as="h3" size="sm" weight="bold" tone="danger">
                Danger zone
              </Typography>
              <Typography size="sm" tone="muted" className="mt-1">
                Deleting this user permanently removes the profile.
              </Typography>
              {!confirmDelete ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 size={14} /> Delete user
                </Button>
              ) : (
                <div className="mt-4 rounded-md border border-[var(--danger-strong)] bg-[var(--danger-soft)] p-4">
                  <Typography size="sm" weight="semibold" tone="danger">
                    Delete this user? This action is permanent.
                  </Typography>
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={deleteCurrentUser}
                      disabled={deleteUser.isPending}
                    >
                      <Trash2 size={14} /> Yes, delete
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {mode === 'edit' && (
          <div className="flex justify-end gap-2 border-t border-[var(--line)] bg-[var(--panel)] px-6 py-4">
            <Button variant="ghost" onClick={() => (isNew ? onClose() : setMode('view'))}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(save)}
              disabled={createUser.isPending || updateUser.isPending}
            >
              <Check size={15} />{' '}
              {createUser.isPending || updateUser.isPending ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
