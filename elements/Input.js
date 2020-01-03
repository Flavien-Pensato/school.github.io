import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  space,
  width,
  display,
  fontSize,
  fontWeight,
  lineHeight,
  borders,
  borderColor,
  borderRadius,
  color,
} from 'styled-system';

const Input = styled('input', { shouldForwardProp })(
  space,
  width,
  display,
  fontSize,
  fontWeight,
  lineHeight,
  color,
  borders,
  borderColor,
  borderRadius,
  {
    boxSizing: 'border-box',
    '&:focus': {
      color: '#F58C18',
    },
  },
);

Input.defaultProps = {
  padding: '0.5rem',
  fontSize: [16, 18],
  backgroundColor: 'transparent',
  border: 'none',
};

export default Input;
