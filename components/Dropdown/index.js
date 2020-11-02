import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'rebass';

// import StudentList from '../StudentList';

// const Card = styled(Box)`
//   border: 1px solid;
//   border-color: ${({ active }) => (active ? '#F58C18' : 'black')};
//   border-radius: 4px;

//   padding: 15px;
//   margin: 15px 0px;
//   cursor: pointer;
// `;

const Dropdown = ({ name, items }) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive(!active));

  return (
    <Box variant="card" active={active}>
      <Box display="flex" justifyContent="space-between" onClick={toggleActive}>
        <Text as="strong" variant={active && 'primary'}>
          {name}
        </Text>
      </Box>
      <Box>{active && items}</Box>
    </Box>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Dropdown;
