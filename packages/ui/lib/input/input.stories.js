'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _input = require('./input.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Input', module);

stories.add('Test', function () {
  return _react2.default.createElement(_input.Input, { type: 'text' });
});

stories.add('Email', function () {
  return _react2.default.createElement(_input.Input, { type: 'email', value: 'toto@gmail.com' });
});

stories.add('Password form', function () {
  return _react2.default.createElement(_input.InputForm, { type: 'password', name: 'password', textLabel: 'Mot de passe' });
});