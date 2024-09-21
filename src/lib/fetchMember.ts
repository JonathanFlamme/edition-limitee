export async function updateMembersByBnet() {
  const res = await fetch('/api/members/bnet', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return await res.json();
}

export async function updateMembersByBdd() {
  const res = await fetch('/api/members/bdd', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return await res.json();
}
