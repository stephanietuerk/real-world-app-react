export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.statusText}`);
  }

  return res.json();
}
