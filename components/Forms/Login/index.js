import React, { useCallback } from 'react';
import Router from 'next/router';
import styled from '@emotion/styled';

import firebase from '../../../config/firebase';

import { Div, Fieldset, Form, Legend, Label, Input } from '../../../elements';

export const Button = styled.button`
  font-size: 0.875rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: #a463f2;
  color: #fff;
  border-radius: 9999px;
  border-style: none;
  border-width: 0;
`;

const Login = () => {
  const signin = useCallback(event => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(event.target.email.value, event.target.password.value)
      .then(() => Router.push('/home'));
  }, []);

  return (
    <Div maxWidth="25rem" padding="1rem">
      <Form onSubmit={signin}>
        <Fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <Legend>Connection</Legend>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" id="email" />

          <Label htmlFor="password">Mot de passe</Label>
          <Input type="password" name="password" id="password" />
        </Fieldset>
        <Button type="submit">Se connecter</Button>
      </Form>
    </Div>
  );
};

export default Login;
