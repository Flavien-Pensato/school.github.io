import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  space,
  width,
  maxWidth,
  display,
  fontSize,
  fontWeight,
  color,
  borders,
  borderColor,
  borderRadius,
} from 'styled-system';

const Legend = styled('legend', { shouldForwardProp })(
  space,
  width,
  maxWidth,
  display,
  fontSize,
  fontWeight,
  color,
  borders,
  borderColor,
  borderRadius,
  {
    boxSizing: 'border-box',
    maxWidth: '100%',
    whiteSpace: 'normal',
  },
);

Legend.defaultProps = {
  fontSize: 4,
  fontWeight: 'bold',
  color: 'inherit',
  display: 'table',
  p: 0,
};

export default Legend;
