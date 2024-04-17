import { PostulationType } from '@/@type/postulation';

export async function sendPostulation(formData: PostulationType) {
  const apiEndpoint = '/api/postulation';

  const res = await fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  console.log(data);
}
