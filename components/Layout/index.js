import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/client';
import { withRouter } from 'next/router';
import { IconButton, NavLink, Box, Flex } from 'theme-ui';
import Link from 'next/link';

import Loading from '../Loading';
import Title from '../Title';

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
      <Flex as="nav" sx={{
        borderBottom: '1px solid black',
        borderTop: '1px solid black',
        padding: '20px',
      }}>
        <Link href="/">
          <NavLink>Planning</NavLink>
        </Link>
        <Link href="/classes">
          <NavLink>Classes</NavLink>
        </Link>
        <Link href="/calendrier">
          <NavLink>Calendrier</NavLink>
        </Link>
        <Link href="/taches">
          <NavLink>Taches</NavLink>
        </Link>
        <Link href="/statistiques">
          <NavLink>Statistiques</NavLink>
        </Link>
        <Box height="10px" width="10px" color="primary" />

        <IconButton onClick={signOut}>
          <i className="fas fa-sign-out-alt" />
        </IconButton>
      </Flex>
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
