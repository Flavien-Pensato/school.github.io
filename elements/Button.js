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
  variant,
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
    cursor: 'pointer',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    overflow: 'visible',
    textTransform: 'none',
    webkitAppearance: 'button',
    whiteSpace: 'nowrap',
  },
  variant({
    variants: {
      primary: {
        color: 'white',
        bg: 'primary',
      },
    },
  }),
);

Button.defaultProps = {
  fontSize: [16, 18],
  fontWeight: 'bold',
  lineHeight: 1.25,
  padding: '5px',
  textAlign: 'center',
  borderRadius: '4px',
  color: 'primary',
  bg: 'white',
  border: '2px solid #F58C18',
};

export default Button;
