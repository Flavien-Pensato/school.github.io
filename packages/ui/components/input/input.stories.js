import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './input.component';

const stories = storiesOf('Input', module);

stories.add('Test', () => <Input type="text" />);

stories.add('Email', () => <Input type="email" value="toto@gmail.com" />);
