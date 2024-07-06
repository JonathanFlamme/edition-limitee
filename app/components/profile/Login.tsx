import React, { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import RedirectBnet from './RedirectBnet';
import { jost } from '@/utils/font';
import { toast } from 'sonner';
import Profile from './Profile';

export default function Login() {
  const { data: session, status } = useSession();

  useEffect(() => {
    status === 'authenticated' &&
      toast.success(`Bienvenue sur le site, ${session.character.name} ! Heureux de vous revoir.`);
  }, [status]);

  return (
    <div className={`${jost.className}`}>
      {status === 'authenticated' ? <Profile /> : <RedirectBnet />}
    </div>
  );
}
