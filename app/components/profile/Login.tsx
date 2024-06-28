import React from 'react';

import { useSession, signIn } from 'next-auth/react';
import Profile from '../profile/Profile';
import LoginBnet from './LoginBnet';

export default function Login() {
  const { data: session } = useSession();

  return <div>{!session ? <LoginBnet /> : <Profile />}</div>;
}
