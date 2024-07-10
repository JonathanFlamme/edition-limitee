import { HttpError } from './customError';

export async function fetchPresentations() {
  const apiEndpoint = '/api/landing/presentations';

  try {
    const res = await fetch(apiEndpoint);
    const response = await res.json();

    if (!res.ok) {
      throw new HttpError(response.message, res.status);
    }
    return response.presentations;
  } catch (error) {
    throw error;
  }
}
