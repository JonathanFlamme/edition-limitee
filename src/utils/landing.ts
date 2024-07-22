import { HttpError } from './customError';

export async function fetchPresentations() {
  const apiEndpoint = '/api/home/presentations';

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

export async function fetchPostPresentations(name: string) {
  const apiEndpoint = '/api/home/presentations';

  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
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
  const apiEndpoint = '/api/home/search';

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
  const apiEndpoint = '/api/home/contact';

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
