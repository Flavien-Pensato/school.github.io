import React, { Fragment, useState, useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';

export const Tooltips = ({ groupe }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <Fragment>
      <Button ref={target} onClick={() => setShow(!show)}>
        Infos
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {props => <Tooltip {...props}>My Tooltip</Tooltip>}
      </Overlay>
    </Fragment>
  );
};
