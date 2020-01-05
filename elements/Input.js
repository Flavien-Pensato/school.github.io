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
  },
);

Input.defaultProps = {
  padding: '0.5rem',
  fontSize: [2, 3],
  backgroundColor: 'transparent',
  width: '100%',
  borderStyle: 'solid',
  borderWidth: '1px',
  lineHeight: 1,
};

export default Input;
