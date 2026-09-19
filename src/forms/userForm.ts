import type { User, UserInput } from '../types';
import { getUserStatus } from '../hooks/userStatus';
import type { RegisterOptions } from 'react-hook-form';

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
  firstName: { required: 'Enter a first name.', minLength: { value: 2, message: 'First name must be at least 2 characters.' } },
  lastName: { required: 'Enter a last name.', minLength: { value: 2, message: 'Last name must be at least 2 characters.' } },
  email: {
    required: 'Enter an email address.',
    pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Enter a valid email.' },
  },
  phone: {
    required: 'Enter a phone number.',
    pattern: { value: /^[+\d][\d\s().-]{6,19}$/, message: 'Enter a valid phone number.' },
  },
  username: {
    required: 'Enter a username.',
    minLength: { value: 3, message: 'Username must be at least 3 characters.' },
    maxLength: { value: 30, message: 'Username must be 30 characters or fewer.' },
    pattern: { value: /^[a-zA-Z0-9._-]+$/, message: 'Use only letters, numbers, dots, underscores, or hyphens.' },
  },
  company: { required: 'Enter a company name.' },
  gender: {
    required: 'Select a gender.',
    validate: (value) => (typeof value === 'string' && ['female', 'male'].includes(value)) || 'Select a valid gender.',
  },
  age: {
    required: 'Enter an age.',
    valueAsNumber: true,
    validate: (value) => (typeof value === 'number' && Number.isInteger(value)) || 'Age must be a whole number.',
    min: { value: 1, message: 'Age must be at least 1.' },
    max: { value: 120, message: 'Age must be 120 or less.' },
  },
  status: {
    required: 'Select a status.',
    validate: (value) => (typeof value === 'string' && ['active', 'inactive'].includes(value)) || 'Select a valid status.',
  },
} satisfies Partial<Record<keyof UserFormValues, RegisterOptions<UserFormValues>>>;

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
