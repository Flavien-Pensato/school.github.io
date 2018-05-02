import React from 'react';
import { storiesOf } from '@storybook/react';
import { Title } from './title.component';

storiesOf('Title', module)
	.add('Login', () => (
		<Title>Mfr Chatte</Title>
	));
