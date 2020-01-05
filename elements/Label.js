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
  textAlign,
  textStyle,
  color,
} from 'styled-system';

const Label = styled('label', { shouldForwardProp })(
  space,
  width,
  maxWidth,
  display,
  fontSize,
  fontWeight,
  lineHeight,
  textAlign,
  textStyle,
  color,
  {},
);

Label.defaultProps = {
  fontSize: 2,
  lineHeight: 2,
  color: 'black',
};

export default Label;
