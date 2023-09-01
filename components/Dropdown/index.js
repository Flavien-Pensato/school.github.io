import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';

const Dropdown = ({ name, items }) => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive(!active));

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        padding: '15px',
        border: '1px solid black',
        borderRadius: '4px',
        textAlign: 'right',
        my: '7px',
      }}
      active={active}
    >
      <Flex onClick={toggleActive}>
        <Text as="strong" variant={active && 'primary'}>
          {name}
        </Text>
      </Flex>
      <Box>{active && items}</Box>
    </Box>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Dropdown;
