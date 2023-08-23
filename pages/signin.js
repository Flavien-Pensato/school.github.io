import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, Button } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { withRouter } from 'next/router';

const Signin = ({ router }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  return (
    <Flex
      sx={{
        height: '100vh',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button varant="primary" type="button" onClick={signIn}>
        Se connecter
      </Button>
    </Flex>
  );
};

Signin.propTypes = {
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Signin);
