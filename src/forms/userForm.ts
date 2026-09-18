import type { User, UserInput } from '../types';
import { getUserStatus } from '../hooks/userStatus';

export type UserFormValues = Pick<UserInput, 'firstName' | 'lastName' | 'email' | 'phone' | 'username' | 'gender' | 'age'> & {
  company: string;
  status: 'active' | 'inactive';
};

export const userFormDefaults: UserFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  gender: 'female',
  age: 25,
  company: '',
  status: 'active',
};

export const userFieldRules = {
  firstName: { required: 'Enter a first name.' },
  lastName: { required: 'Enter a last name.' },
  email: {
    required: 'Enter an email address.',
    pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Enter a valid email.' },
  },
} as const;

export function userToFormValues(user?: User): UserFormValues {
  return {
    ...userFormDefaults,
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    username: user?.username ?? '',
    gender: user?.gender ?? 'female',
    age: user?.age ?? 25,
    company: user?.company.name ?? '',
    status: user ? getUserStatus(user) : 'active',
  };
}

export function formValuesToUserInput(values: UserFormValues, user?: User): UserInput {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    username: values.username,
    gender: values.gender,
    age: values.age,
    company: {
      name: values.company,
      title: user?.company.title ?? 'Team member',
      department: user?.company.department ?? 'General',
    },
  };
}
