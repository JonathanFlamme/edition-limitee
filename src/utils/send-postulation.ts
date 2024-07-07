import { PostulationType } from '@/@type/postulation';

export async function sendPostulation(formData: PostulationType) {
  const apiEndpoint = '/api/postulation';

  const res = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error('Failed to send postulation');

  const response = await res.json();
  return response;
}
