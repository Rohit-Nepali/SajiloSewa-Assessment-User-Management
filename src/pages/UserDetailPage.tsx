import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { User } from '../types';
import { userService } from '../services/userService';
import { AppLink } from '../components/shared/Link';
import { Button } from '../components/shared/Button';
import { Info } from '../components/shared/Info';
import { ErrorState, LoadingState } from '../components/common/States';
import { InfoBlock } from '../components/shared/InfoBlock';
import { Typography } from '../components/shared/Typography';

const page = 'mx-auto w-full max-w-[1180px] px-[6%] py-[62px] max-sm:px-5 max-sm:py-[35px]';
const narrow = `${page} max-w-[950px]`;

export function UserDetailsPage() {
  const { id = '' } = useParams(),
    navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    userService
      .getUserById(id)
      .then(setUser)
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'User not found.'));
  }, [id]);
  if (error)
    return (
      <section className={page}>
        <ErrorState message={error} retry={() => navigate('/users')} />
      </section>
    );
  if (!user)
    return (
      <section className={page}>
        <LoadingState />
      </section>
    );
  return (
    <section className={narrow}>
      <AppLink to="/users" variant="back">
        <span className="inline-flex items-center gap-1"><ArrowLeft size={15} aria-hidden="true" /> Back to directory</span>
      </AppLink>
      <div className="flex items-center justify-between gap-[25px] border-b border-[var(--line)] pb-[35px] max-sm:flex-col max-sm:items-start">
        <img
          className="h-[100px] w-[100px] rounded-full bg-[var(--soft)] object-cover max-sm:h-20 max-sm:w-20"
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div className="flex-1">
          <Typography size="xs" weight="bold" tone="subtle" className="uppercase tracking-[0.12em]">Profile / {user.username}</Typography>
          <Typography as="h1" size="3xl" weight="bold" className="my-2.5 font-heading leading-none max-sm:text-4xl">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography tone="muted" className="mb-0">
            {user.company.title} at {user.company.name}
          </Typography>
        </div>
        <AppLink to={`/users/${user.id}/edit`}>
          <Button variant="secondary"><Pencil size={16} aria-hidden="true" /> Edit profile</Button>
        </AppLink>
      </div>
      <div className="mt-[25px] grid grid-cols-1 gap-[15px] sm:grid-cols-2">
        <InfoBlock title="Personal information">
          <Info label="Email" value={user.email} />
          <Info label="Phone" value={user.phone} />
          <Info label="Gender" value={user.gender} />
          <Info label="Age" value={String(user.age)} />
        </InfoBlock>
        <InfoBlock title="Address">
          <Info label="Street" value={user.address.address} />
          <Info label="City" value={`${user.address.city}, ${user.address.state}`} />
          <Info label="Country" value={`${user.address.country} ${user.address.postalCode}`} />
        </InfoBlock>
        <InfoBlock title="Company">
          <Info label="Company" value={user.company.name} />
          <Info label="Department" value={user.company.department} />
          <Info label="Role" value={user.company.title} />
        </InfoBlock>
        <InfoBlock title="Bank information">
          <Info label="Card type" value={user.bank.cardType} />
          <Info label="IBAN" value={user.bank.iban} />
          <Info label="Card number" value={user.bank.cardNumber} />
        </InfoBlock>
      </div>
    </section>
  );
}
