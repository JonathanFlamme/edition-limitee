import React from 'react';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

export default function Logout() {
  const handleLogout = async () => {
    signOut({ redirect: false });
    toast.info('Vous venez de vous déconnecter. À bientôt !');
  };

  return <p onClick={handleLogout}>Déconnexion</p>;
}
