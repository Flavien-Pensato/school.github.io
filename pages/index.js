import { useEffect } from 'react';
import Router from 'next/router';

const Landing = () => {
  useEffect(() => {
    Router.push('/home');
  }, []);

  return null;
};

export default Landing;
