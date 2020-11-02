import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Text } from 'rebass';
import Layout from '../components/Layout';

const Landing = () => {
  const [session] = useSession();

  return (
    <>
      <Text variant="body">Signed in as {session.user.email} </Text>
      <br />
      <button onClick={signOut}>Sign out</button>
    </>
  );
};

Landing.Layout = Layout;

export default Landing;
