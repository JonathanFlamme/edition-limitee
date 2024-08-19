export async function updateMythicsByBnet() {
  const res = await fetch('/api/mythic-plus', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return await res.json();
}
