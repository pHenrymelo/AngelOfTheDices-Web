import { api } from '@/lib/axios';

export interface signInBody {
  email: string;
  password: string;
}

export interface signInResponse {
  accessToken: string;
}

export async function authenticate({ email, password }: signInBody) {
  return api.post<signInResponse>('/auth/session', {
    email,
    password,
  });
}
