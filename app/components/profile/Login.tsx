import React, { useEffect } from 'react';

import { useSession, signIn } from 'next-auth/react';
import Profile from '../profile/Profile';
import LoginBnet from './LoginBnet';
import { jost } from '@/utils/font';
import { toast } from 'sonner';

export default function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    status === 'authenticated' &&
      toast.success(`Bienvenue sur le site, ${session.character.name} ! Heureux de vous revoir.`);
    status === 'unauthenticated' && toast.info('Vous venez de vous déconnecter. À bientôt !');
  }, [status]);

  return <div className={`${jost.className}`}>{!session ? <LoginBnet /> : <Profile />}</div>;
}
