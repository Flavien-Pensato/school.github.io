'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  font-weight: 700;\n  display: inline-block;\n  border-color: #000;\n  border-style: solid;\n  border-width: 1px;\n'], ['\n  font-size: 0.875rem;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  font-weight: 700;\n  display: inline-block;\n  border-color: #000;\n  border-style: solid;\n  border-width: 1px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ButtonStyle = _styledComponents2.default.button(_templateObject);

var Button = exports.Button = function Button(props) {
  return _react2.default.createElement(ButtonStyle, props);
};