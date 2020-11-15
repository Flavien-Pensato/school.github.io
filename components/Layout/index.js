import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/client';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Button, Link as RebassLink } from 'rebass';

import Loading from '../Loading';
import Title from '../Title';
import Menu from '../Menu';

const Layout = ({ children, router }) => {
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/signin');
    }
  }, [session, loading]);

  if (loading) {
    return <Loading />;
  }

  if (!session) {
    return children;
  }

  return (
    <>
      <Title />
      <Menu>
        <Link href="/">
          <RebassLink variant={router.pathname === '/' ? 'activeLink' : 'link'}>Planning</RebassLink>
        </Link>
        <Link href="/classes">
          <RebassLink variant={router.pathname === '/classes' ? 'activeLink' : 'link'}>Classes</RebassLink>
        </Link>
        <Link href="/calendrier">
          <RebassLink variant={router.pathname === '/calendrier' ? 'activeLink' : 'link'}>Calendrier</RebassLink>
        </Link>
        <Link href="/taches">
          <RebassLink variant={router.pathname === '/taches' ? 'activeLink' : 'link'}>Taches</RebassLink>
        </Link>
        <Button onClick={signOut}>Deconnexion</Button>
      </Menu>
      {children}
    </>
  );
};

Layout.propTypes = {
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(Layout);
