import { api } from '@/lib/axios';

export interface signUpBody {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({ name, email, password }: signUpBody) {
  await api.post('/users/account', { name, email, password });
}
