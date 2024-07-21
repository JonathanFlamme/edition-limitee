'use client';
import { useState } from 'react';
import { EditMails } from './EditMails';

interface MailsListProps {
  mails: string[];
}

export default function MailsList({ mails }: MailsListProps) {
  const [mailsList, setMailsList] = useState<string[]>(mails);
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-left max-w-full md:max-w-[400px] border-2 border-gray-300 mt-10 m-5 md:m-10 backdrop-blur-xl bg-white bg-opacity-50 rounded-lg p-4">
      <EditMails
        IsOpen={IsOpen}
        setIsOpen={setIsOpen}
        mailsList={mailsList}
        setMailsList={setMailsList}
      />
      <h1 className="text-xl mb-4  text-black">Emails :</h1>
      <ul>
        {mailsList.map((mail) => (
          <li key={mail} className="text-black mt-3">
            {mail}
          </li>
        ))}
      </ul>
    </div>
  );
}
