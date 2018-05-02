import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend } from './legend.component';

const stories = storiesOf('Legend', module);

stories.add('Legend', () => <Legend>Password</Legend>);
