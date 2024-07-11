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

export async function fetchSearch() {
  const apiEndpoint = '/api/landing/search';

  try {
    const res = await fetch(apiEndpoint);
    const response = await res.json();

    if (!res.ok) {
      throw new HttpError(response.message, res.status);
    }
    return response.search;
  } catch (error) {
    throw error;
  }
}

export async function fetchContact() {
  const apiEndpoint = '/api/landing/contact';

  try {
    const res = await fetch(apiEndpoint);
    const response = await res.json();

    if (!res.ok) {
      throw new HttpError(response.message, res.status);
    }
    return response.contact;
  } catch (error) {
    throw error;
  }
}
