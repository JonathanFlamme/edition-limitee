import { jost } from '@/src/utils/font';
import MailsList from './components/MailsList';
import { cookies } from 'next/headers';

async function getMail(): Promise<string[]> {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;
  const res = await fetch(`${baseUrl}/api/settings/mails`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    return [];
    // throw new Error('Failed to fetch GET data');
  }
  return await res.json();
}

export default async function Settings() {
  const mails = await getMail();

  return (
    <div
      className={`${jost.className} text-white h-screen flex flex-col items-center pt-24 md:max-w-[900px] mx-auto`}
    >
      <MailsList mails={mails} />
    </div>
  );
}
