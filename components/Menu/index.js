import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

const Menu = ({ children }) => (
  <Flex as="nav" variant="nav">
    {children}
  </Flex>
);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
