'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _title = require('./title.component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Title', module).add('Login', function () {
	return _react2.default.createElement(
		_title.Title,
		null,
		'Mfr Chatte'
	);
});