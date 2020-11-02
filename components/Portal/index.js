import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

// import Div from '../../elements/Div';

const Overlay = styled(Div)`
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Modal = styled(Div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.75);
  background-color: white;

  padding: 20px 50px 20px 20px;
  overflow: auto;

  width: 600px;
  max-width: 100%;

  height: 400px;
  max-height: 100%;
`;

const Portal = ({ children }) => {
  const element = useRef(document.createElement('div'));

  useEffect(() => {
    const modalRoot = document.querySelector('#modal-root');
    modalRoot.appendChild(element.current);

    return () => modalRoot.removeChild(element.current);
  }, []);

  return ReactDOM.createPortal(
    <Overlay>
      <Modal>{children}</Modal>
    </Overlay>,
    element.current,
  );
};

export default Portal;
