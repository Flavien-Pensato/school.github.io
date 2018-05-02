'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _button = require('./button.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stories = (0, _react3.storiesOf)('Button', module);

stories.add('with text', function () {
	return _react2.default.createElement(
		_button.Button,
		{ onClick: (0, _addonActions.action)('clicked') },
		'Hello Button'
	);
});

stories.add('with some emoji', function () {
	return _react2.default.createElement(
		_button.Button,
		{ onClick: (0, _addonActions.action)('clicked') },
		_react2.default.createElement(
			'span',
			{ role: 'img', 'aria-label': 'emoji' },
			'\uD83D\uDE00'
		),
		_react2.default.createElement(
			'span',
			{ role: 'img', 'aria-label': 'emoji' },
			'\uD83D\uDE0E'
		),
		_react2.default.createElement(
			'span',
			{ role: 'img', 'aria-label': 'emoji' },
			'\uD83D\uDC4D'
		),
		_react2.default.createElement(
			'span',
			{ role: 'img', 'aria-label': 'emoji' },
			'\uD83D\uDCAF'
		)
	);
});