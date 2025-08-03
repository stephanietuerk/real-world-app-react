import { API_ROOT } from '../shared/constants/api';

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export async function login(
  email: string,
  password: string,
): Promise<{ user: User }> {
  const res = await fetch(API_ROOT + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!res.ok) {
    handleErrorResponse(res);
  }

  const data = await res.json();
  return data;
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<{ user: User }> {
  const res = await fetch(API_ROOT + 'users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { username, email, password } }),
  });

  if (!res.ok) {
    handleErrorResponse(res);
  }

  const data = await res.json();
  return data;
}

function handleErrorResponse(res: Response): Promise<never> {
  return res.json().then((errorData) => {
    const message = errorData?.errors
      ? Object.entries(errorData.errors)
          .map(
            ([field, msgs]) =>
              `${field} ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`,
          )
          .join(', ')
      : 'Unknown error';
    const error = new Error(message) as Error & { code?: number };
    error.code = res.status;
    throw error;
  });
}
