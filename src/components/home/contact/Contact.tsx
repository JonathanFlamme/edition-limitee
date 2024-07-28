import React from 'react';
import ContactList from './ContactList';
import { ContactType } from '@/@type/type';

interface ContactProps {
  contacts: ContactType[];
}

export default async function Contact({ contacts }: ContactProps) {
  return (
    <div id="contact" className="bg-black">
      <ContactList contacts={contacts} />
    </div>
  );
}
