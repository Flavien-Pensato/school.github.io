import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { space, fontSize, fontWeight, color, variant } from 'styled-system';

const Strong = styled('strong', { shouldForwardProp })(
  space,
  fontSize,
  fontWeight,
  color,
  {},
  variant({
    variants: {
      primary: {
        color: 'primary',
      },
    },
  }),
);

Strong.defaultProps = {
  fontWeight: 'bolder',
};

export default Strong;
