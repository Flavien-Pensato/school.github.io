'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputForm = exports.Input = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  margin: 1rem 0;\n'], ['\n  margin: 1rem 0;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: .875rem;\n  line-height: 1.5;\n  font-weight: 600;\n  font-family: sans-serif;\n'], ['\n  font-size: .875rem;\n  line-height: 1.5;\n  font-weight: 600;\n  font-family: sans-serif;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  padding: 0.5rem;\n  background-color: transparent;\n  width: 100%;\n  border-style: solid;\n  border-width: 1px;\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0;\n\n  &:hover {\n    background-color: #000;\n    color: #fff;\n  }\n'], ['\n  padding: 0.5rem;\n  background-color: transparent;\n  width: 100%;\n  border-style: solid;\n  border-width: 1px;\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0;\n\n  &:hover {\n    background-color: #000;\n    color: #fff;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DivContent = _styledComponents2.default.div(_templateObject);

var LabelForm = _styledComponents2.default.label(_templateObject2);

var InputStyle = _styledComponents2.default.input(_templateObject3);

var Input = exports.Input = function Input(props) {
  return _react2.default.createElement(InputStyle, props);
};

var InputForm = exports.InputForm = function InputForm(_ref) {
  var type = _ref.type,
      name = _ref.name,
      textLabel = _ref.textLabel;
  return _react2.default.createElement(
    DivContent,
    null,
    _react2.default.createElement(
      LabelForm,
      { htmlFor: name },
      textLabel
    ),
    _react2.default.createElement(InputStyle, { type: type, name: name, id: name })
  );
};