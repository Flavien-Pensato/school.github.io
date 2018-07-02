'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  font-size: 2rem;\n  font-family: sans-serif;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  text-transform: uppercase;\n  font-weight: 700;\n  display: inline-block;\n'], ['\n  font-size: 2rem;\n  font-family: sans-serif;\n  padding: 0.5rem 1rem;\n  background-color: transparent;\n  text-transform: uppercase;\n  font-weight: 700;\n  display: inline-block;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TitleForm = _styledComponents2.default.h2(_templateObject);

var Title = exports.Title = function Title(props) {
  return _react2.default.createElement(TitleForm, props);
};