export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem('token');
  console.log('token:', token);
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
    }
    throw new Error(`Request failed: ${response.statusText}`);
  }

  return response.json();
}
