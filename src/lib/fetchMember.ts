export async function updateMembersByBnet() {
  const res = await fetch('/api/members', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return await res.json();
}
