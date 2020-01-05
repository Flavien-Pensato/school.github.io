import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  space,
  width,
  maxWidth,
  display,
  fontSize,
  fontWeight,
  lineHeight,
  background,
  textAlign,
  position,
  layout,
  color,
  border,
  textStyle,
} from 'styled-system';

const Button = styled('button', { shouldForwardProp })(
  space,
  width,
  position,
  maxWidth,
  display,
  background,
  fontSize,
  fontWeight,
  lineHeight,
  layout,
  textAlign,
  color,
  border,
  textStyle,
  {
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    overflow: 'visible',
    textTransform: 'none',
    webkitAppearance: 'button',
    whiteSpace: 'nowrap',
  },
);

Button.defaultProps = {
  fontSize: '100%',
  lineHeight: 1.25,
  m: 0,
  textAlign: 'center',
};

export default Button;
