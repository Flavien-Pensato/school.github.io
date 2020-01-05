import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  space,
  width,
  display,
  maxWidth,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textStyle,
  color,
  borders,
  borderColor,
  borderRadius,
} from 'styled-system';

const P = styled('p', { shouldForwardProp })(
  space,
  width,
  display,
  maxWidth,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textStyle,
  color,
  borders,
  borderColor,
  borderRadius,
  {
    boxSizing: 'border-box',
  },
);

P.defaultProps = {
  // Sets text to maximum ~80 characters wide
  lineHeight: 1.5,
  fontSize: [16, 18],
};

export default P;
