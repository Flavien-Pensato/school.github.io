import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { signin, useSession } from 'next-auth/client';
import { withRouter } from 'next/router';

import { Button } from 'rebass';

const Signin = ({ router }) => {
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <Button varant="primary" type="button" onClick={signin}>
      Se connecter
    </Button>
  );
};

Signin.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Signin);
