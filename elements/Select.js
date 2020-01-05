import styled from '@emotion/styled';
import shouldForwardProp from '@styled-system/should-forward-prop';
import { space, display, width } from 'styled-system';

const Select = styled('select', { shouldForwardProp })(space, display, width, {});

Select.defaultProps = {
  padding: '0.5rem',
  fontSize: [16, 18],
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'none',
};

export default Select;
