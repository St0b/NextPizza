export async function safeFetch(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`HTTP error! status: ${res.status}, message: ${error}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    throw new Error('Invalid content type');
  }

  return res.json();
}