export async function fetchCharacters() {
  const apiEndpoint = '/api/characters';

  const res = await fetch(apiEndpoint);

  if (!res.ok) throw new Error('Failed to fetch characters');

  const response = await res.json();
  return response;
}

export async function fetchCharacter(name: string, realm: string) {
  const apiEndpoint = `/api/characters/character?name=${name}&realm=${realm}`;

  const res = await fetch(apiEndpoint);

  if (!res.ok) throw new Error('Failed to fetch character info');

  const response = await res.json();
  return response.session;
}
