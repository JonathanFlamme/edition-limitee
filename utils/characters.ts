import { Session } from 'next-auth';
import { HttpError } from './customError';

export async function fetchCharacters() {
  const apiEndpoint = '/api/characters';

  const res = await fetch(apiEndpoint);

  if (!res.ok) throw new Error('Failed to fetch characters');

  const response = await res.json();
  return response;
}

export async function fetchCharacter(name: string, realm: string): Promise<Session | undefined> {
  const apiEndpoint = `/api/characters/character?name=${name}&realm=${realm}`;
  try {
    const res = await fetch(apiEndpoint);
    const response = await res.json();

    if (!res.ok) {
      throw new HttpError(response.message, res.status);
    }

    return response.session;
  } catch (error) {
    console.error(error);
  }
}
