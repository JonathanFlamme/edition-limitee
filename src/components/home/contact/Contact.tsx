import React from 'react';
import ContactList from './ContactList';

async function getData() {
  const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;

  const res = await fetch(`${baseUrl}/api/home/contacts`, {
    method: 'GET',
    next: { revalidate: 3600, tags: ['contacts'] },
  });

  if (!res.ok) {
    return [];
    // throw new Error('Failed to fetch GET data');
  }
  return await res.json();
}

export default async function Contact() {
  const contacts = await getData();

  return (
    <div id="contact" className="bg-black">
      <ContactList contacts={contacts} />
    </div>
  );
}
