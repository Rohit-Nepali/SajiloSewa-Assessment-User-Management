export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: { address: string; city: string; state: string; postalCode: string; country: string };
  company: { name: string; title: string; department: string };
  bank: { cardType: string; iban: string; cardNumber: string };
}

export interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  gender: string;
  age: number;
  company: { name: string; title: string; department: string };
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}
