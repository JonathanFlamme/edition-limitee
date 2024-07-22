import React from 'react';
import ContactList from './ContactList';
import { ContactType } from '@/@type/type';

// async function fetchContact(): Promise<ContactType[]> {
//   const baseUrl = process.env.BASE_URL || `https://${process.env.VERCEL_URL}`;
//   const res = await fetch(`${baseUrl}/api/home/contacts`, { cache: 'no-store' });

//   if (!res.ok) {
//     return [];
//     // throw new Error('Failed to fetch GET data');
//   }
//   return await res.json();
// }

interface ContactProps {
  contacts: ContactType[];
}

export default async function Contact({ contacts }: ContactProps) {
  // const contacts = await fetchContact();

  return (
    <div id="contact" className="bg-black">
      <ContactList contacts={contacts} />
    </div>
  );
}
