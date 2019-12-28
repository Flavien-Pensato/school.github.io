import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { space, width, maxWidth, fontSize, fontWeight, textAlign, color, borders, borderColor } from 'styled-system';

const Td = styled('td', { shouldForwardProp })(
  space,
  width,
  maxWidth,
  fontSize,
  fontWeight,
  textAlign,
  color,
  borders,
  borderColor,
  {
    padding: '5px',
  },
);

Td.defaultProps = {};

export default Td;
