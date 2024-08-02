'use server';

export async function fetchHome() {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/home`, {
    next: { revalidate: 86400, tags: ['home'] },
  });
  if (!res.ok) {
    return { presentations: [], contacts: [], searches: [] };
    // throw new Error('Failed to fetch GET data');
  }
  return await res.json();
}
