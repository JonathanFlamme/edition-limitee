import React from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export default function Logout() {
  const handleLogout = async () => {
    signOut({ redirect: false });
    toast.info('Vous venez de vous déconnecter. À bientôt !');
  };

  return (
    <p
      className="cursor-pointer text-xl my-2 text-white hover:text-gray-300"
      onClick={handleLogout}
    >
      Se déconnecter
    </p>
  );
}
