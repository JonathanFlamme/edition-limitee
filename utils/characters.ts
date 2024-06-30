export async function fetchCharacters() {
  const apiEndpoint = '/api/characters';

  const res = await fetch(apiEndpoint);

  if (!res.ok) throw new Error('Failed to fetch characters');

  const response = await res.json();
  return response;
}
