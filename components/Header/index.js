import React, { useState, useCallback, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { DisplayContext } from '../../modules/display/display.context';
import { A, H1, Br, Div, Header, Span, Strong, Button, Nav, I } from '../../elements';

const LinkNav = styled(A)`
  padding: 20px 15px;
  font-size: 14px;
  font-weight: bold;

  color: ${({ isExact }) => (isExact ? '#F58C18' : 'black')};
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover {
    color: #f58c18;
  }
`;

const LinkNavDisconnect = styled(A)`
  padding: 0;
  font-size: 24px;
  line-height: 58px;
  font-weight: bold;

  color: ${({ isExact }) => (isExact ? '#F58C18' : 'black')};
  text-transform: uppercase;
  transition: color 0.2s;
  margin-left: auto;

  &:hover {
    color: #f58c18;
  }
`;
const Menu = () => {
  const { pathname } = useRouter();
  const [position, setPosition] = useState({ top: 0, left: '-100vw', right: '100vw', bottom: 0 });

  const toggleMenu = useCallback(() => {
    if (position.left === 0) {
      setPosition({ top: 0, left: '-100vw', right: '100vw', bottom: 0 });
    } else {
      setPosition({ top: 0, left: 0, right: '100px', bottom: 0 });
    }
  }, [position]);

  return (
    <Fragment>
      <Header width={['100%', 'auto']} textAlign={['left', 'center']}>
        <H1 fontSize={['27px', '32px']} marginTop={0}>
          <Span display="flex" justifyContent={['space-between', 'center']}>
            <Span>MFR Chatte</Span>
            <Button
              zIndex={10}
              display={['initial', 'none']}
              onClick={toggleMenu}
              border="none"
              background="none"
              bg="none"
            >
              <I className="fas fa-bars" fontSize="40px" />
            </Button>
          </Span>
        </H1>
      </Header>
      <Nav
        display="flex"
        textAlign="center"
        fontSize={['16px', '18px']}
        flexDirection={['column', 'row']}
        style={{ transition: 'all 1s' }}
        width={['100%', 'auto']}
        borderBottom="1px solid black"
        borderTop="1px solid black"
        position={['absolute', 'initial']}
        justifyContent={['left', 'center']}
        marginTop={['0px', '20px']}
        {...position}
        bg={['near-white', 'inherit']}
      >
        <Link href="/home">
          <LinkNav href="/home" marginLeft="auto" isExact={pathname === '/home'}>
            Planning
          </LinkNav>
        </Link>
        <Link href="/classes">
          <LinkNav href="/classes" isExact={pathname === '/classes'}>
            Classes
          </LinkNav>
        </Link>
        <Link href="/calendrier">
          <LinkNav href="/calendrier" isExact={pathname === '/calendrier'}>
            Calendrier
          </LinkNav>
        </Link>
        <Link href="/taches">
          <LinkNav href="/taches" isExact={pathname === '/taches'}>
            Tâches
          </LinkNav>
        </Link>
        <Link href="/logout">
          <LinkNavDisconnect>
            <I className="fas fa-sign-out-alt" />
          </LinkNavDisconnect>
        </Link>
      </Nav>
      <Div margin="20px 0px">
        <DisplayContext.Consumer>
          {({ date }) => (
            <Strong fontSize={['18px', '20px']}>
              Semaine du&nbsp;
              <Br display={['initial', 'none']} />
              <Span color="primary">{date.format('DD/MM/YYYY')}</Span>&nbsp;au&nbsp;
              <Span color="primary">
                {date
                  .clone()
                  .add('days', 4)
                  .format('DD/MM/YYYY')}
              </Span>
            </Strong>
          )}
        </DisplayContext.Consumer>
      </Div>
    </Fragment>
  );
};

export default Menu;
