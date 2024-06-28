import React from 'react';
import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <p
      className=" cursor-pointer text-xl my-2 text-white hover:text-gray-300"
      onClick={() => signOut()}
    >
      Se déconnecter
    </p>
  );
}
