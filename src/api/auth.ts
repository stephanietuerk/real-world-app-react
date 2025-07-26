export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch('https://api.realword.build/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<User> {
  const res = await fetch('https://api.realword.build/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { username, email, password } }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
