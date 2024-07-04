import React from 'react';

import { useSession, signIn } from 'next-auth/react';
import Profile from '../profile/Profile';
import LoginBnet from './LoginBnet';
import { jost } from '@/utils/font';

export default function Login() {
  const { data: session } = useSession();

  return <div className={`${jost.className}`}>{!session ? <LoginBnet /> : <Profile />}</div>;
}
