import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { signIn, useSession } from 'next-auth/client';
import { withRouter } from 'next/router';

import { Button } from 'rebass';

const Signin = ({ router }) => {
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  return (
    <Button varant="primary" type="button" onClick={signIn}>
      Se connecter
    </Button>
  );
};

Signin.propTypes = {
  router: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Signin);
