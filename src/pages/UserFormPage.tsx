import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import type { UserInput } from '../types';
import { userService } from '../services/userService';
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
  const [initial, setInitial] = useState<Partial<UserInput>>({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    gender: 'female',
    age: 25,
    company: '',
  });

  const [loading, setLoading] = useState(edit),
    [saving, setSaving] = useState(false),
    [error, setError] = useState('');

  useEffect(() => {
    if (edit)
      userService
        .getUserById(id)
        .then((user) => {
          setInitial(user);
          setForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            username: user.username,
            gender: user.gender,
            age: user.age,
            company: user.company.name,
          });
        })
        .catch(() => setError('This user could not be found.'))
        .finally(() => setLoading(false));
  }, [edit, id]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!form.firstName || !form.lastName || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) {
      setError('Enter a first name, last name, and valid email.');
      return;
    }

    const payload: UserInput = {
      ...form,
      company: {
        name: form.company,
        title: initial.company?.title ?? 'Team member',
        department: initial.company?.department ?? 'General',
      },
    };
    setSaving(true);

    const request = edit ? userService.updateUser(id, payload) : userService.createUser(payload);
    request
      .then((user) => navigate(`/users/${user.id}`))
      .catch((reason) =>
        setError(reason instanceof Error ? reason.message : 'Could not save user.'),
      )
      .finally(() => setSaving(false));
  };

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
      {error && (
        <Typography
          className="mt-[25px] rounded-[6px] bg-[var(--danger-soft)] px-[15px] py-3"
          tone="danger"
          role="alert"
        >
          {error}
        </Typography>
      )}
      <form
        className="mt-[35px] grid grid-cols-2 gap-5 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-7 max-sm:grid-cols-1 max-sm:p-5"
        onSubmit={submit}
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
              value={form[field]}
              onChange={(event) => setForm({ ...form, [field]: event.target.value })}
            />
          </FormField>
        ))}
        <FormField label="Gender">
          <Select
            value={form.gender}
            onChange={(event) => setForm({ ...form, gender: event.target.value })}
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
            value={form.age}
            onChange={(event) => setForm({ ...form, age: Number(event.target.value) })}
          />
        </FormField>
        <div className="col-span-full mt-2 flex items-center justify-end gap-2.5 border-t border-[var(--line)] pt-5">
          <AppLink to="/users">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </AppLink>
          <Button disabled={saving}>
            {edit ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {saving ? 'Saving...' : edit ? 'Save changes' : 'Create user'}
          </Button>
        </div>
      </form>
    </section>
  );
}
