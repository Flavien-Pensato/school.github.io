import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

 // automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
    <div style={{ padding: '20px' }}>{story()}</div>
))

addDecorator(withKnobs)

configure(loadStories, module);
