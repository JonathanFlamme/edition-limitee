import { MemberType } from '@/@type/type';

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

export async function addMember(newMember: Partial<MemberType>) {
  const res = await fetch('/api/members', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMember),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch POST data');
  }
  return await res.json();
}
