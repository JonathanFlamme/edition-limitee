export async function fetchGuild() {
  const res = await fetch('/api/guild', {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GET data');
  }

  return await res.json();
}
