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

const InputNumber = styled('input', { shouldForwardProp })(
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
    '&:focus': {
      color: '#F58C18',
    },
  },
);

InputNumber.defaultProps = {
  type: 'number',
  padding: '0.5rem',
  fontSize: [16, 18],
  backgroundColor: 'transparent',
  border: 'none',
};

export default InputNumber;
