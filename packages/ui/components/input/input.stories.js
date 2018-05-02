import React from 'react';
import { storiesOf } from '@storybook/react';
import { Input, InputForm } from './input.component';

const stories = storiesOf('Input', module);

stories.add('Test', () => <Input type="text" />);

stories.add('Email', () => <Input type="email" value="toto@gmail.com" />);

stories.add('Password form', () => <InputForm type="password" name="password" textLabel="Mot de passe" />);
