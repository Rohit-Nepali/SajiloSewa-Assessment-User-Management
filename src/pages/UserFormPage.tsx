import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { useCreateUser, useUpdateUser } from '../hooks/useUserMutations';
import { formValuesToUserInput, userFieldRules, userFormDefaults, userToFormValues, type UserFormValues } from '../forms/userForm';
import { LoadingState } from '../components/common/States';
import { AppLink } from '../components/shared/Link';
import { FormField } from '../components/shared/FormField';
import { Input } from '../components/shared/Input';
import { Select } from '../components/shared/Select';
import { Button } from '../components/shared/Button';
import { Typography } from '../components/shared/Typography';

const page = 'mx-auto w-full max-w-[1180px] px-[6%] py-[62px] max-sm:px-5 max-sm:py-[35px]';
const narrow = `${page} max-w-[950px]`;

export function UserFormPage({ edit = false }: { edit?: boolean }) {
  const { id = '' } = useParams(),
    navigate = useNavigate();
  const userQuery = useUser(edit ? id : '');
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormValues>({
    defaultValues: userFormDefaults,
  });

  useEffect(() => {
    if (!userQuery.data) return;
    // RHF defaults are read once, so reset when async edit data arrives.
    reset(userToFormValues(userQuery.data));
  }, [reset, userQuery.data]);

  const submit = (values: UserFormValues) => {
    setError('');
    const payload = formValuesToUserInput(values, userQuery.data);
    const request = edit
      ? updateUser.mutateAsync({ id, data: payload })
      : createUser.mutateAsync(payload);
    request
      .then((user) => navigate(`/users/${user.id}`))
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Could not save user.'),
      );
  };

  const loading = edit && userQuery.isLoading;
  const saving = createUser.isPending || updateUser.isPending;
  const loadError = userQuery.error ? 'This user could not be found.' : '';

  if (loading)
    return (
      <section className={page}>
        <LoadingState />
      </section>
    );
  const fields = ['firstName', 'lastName', 'email', 'phone', 'username', 'company'] as const;
  return (
    <section className={narrow}>
      <AppLink to="/users" variant="back">
        <span className="inline-flex items-center gap-1"><ArrowLeft size={15} aria-hidden="true" /> Back to directory</span>
      </AppLink>
      <div className="flex flex-col items-start gap-2">
        <Typography size="xs" weight="bold" tone="subtle" className="uppercase tracking-[0.12em]">Directory / {edit ? 'Edit profile' : 'New profile'}</Typography>
        <Typography as="h1" size="display" weight="bold" className="mb-0 mt-0 font-heading">
          {edit ? 'Edit user' : 'Add a new user'}
        </Typography>
        <Typography tone="muted" className="mb-0">
          Keep profile information accurate and useful for the whole team.
        </Typography>
      </div>
      {(error || loadError) && (
        <Typography
          className="mt-[25px] rounded-[6px] bg-[var(--danger-soft)] px-[15px] py-3"
          tone="danger"
          role="alert"
        >
          {error || loadError}
        </Typography>
      )}
      <form
        className="mt-[35px] grid grid-cols-2 gap-5 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-7 max-sm:grid-cols-1 max-sm:p-5"
        onSubmit={handleSubmit(submit)}
      >
        {fields.map((field) => (
          <FormField
            key={field}
            label={
              field === 'firstName'
                ? 'First name'
                : field === 'lastName'
                  ? 'Last name'
                  : field[0].toUpperCase() + field.slice(1)
            }
          >
            <Input
              type={field === 'email' ? 'email' : 'text'}
              {...register(field, field === 'firstName' ? userFieldRules.firstName : field === 'lastName' ? userFieldRules.lastName : field === 'email' ? userFieldRules.email : undefined)}
            />
            {errors[field] && <Typography size="xs" tone="danger">{errors[field]?.message}</Typography>}
          </FormField>
        ))}
        <FormField label="Gender">
          <Select
            {...register('gender')}
          >
            <option>female</option>
            <option>male</option>
          </Select>
        </FormField>
        <FormField label="Age">
          <Input
            type="number"
            min="1"
            max="120"
            {...register('age', { valueAsNumber: true, min: { value: 1, message: 'Age must be at least 1.' }, max: { value: 120, message: 'Age must be 120 or less.' } })}
          />
          {errors.age && <Typography size="xs" tone="danger">{errors.age.message}</Typography>}
        </FormField>
        <div className="col-span-full mt-2 flex items-center justify-end gap-2.5 border-t border-[var(--line)] pt-5">
          <AppLink to="/users">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </AppLink>
          <Button disabled={saving} type="submit">
            {edit ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {saving ? 'Saving...' : edit ? 'Save changes' : 'Create user'}
          </Button>
        </div>
      </form>
    </section>
  );
}
