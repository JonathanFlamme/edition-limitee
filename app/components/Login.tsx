import React from 'react';

import { useSession, signIn } from 'next-auth/react';
import Profile from './Profile';

export default function Login() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button className="mr-2 mt-6" onClick={() => signIn('battlenet')}>
          Se connecter
        </button>
      ) : (
        <Profile />
      )}
    </div>
  );
}
