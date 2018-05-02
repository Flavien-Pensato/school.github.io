import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classname from 'classname';

import './toaster.style.css';

export const Toaster = ({ toaster }) => (
  <div className={classname('toaster', { 'toaster--show': !_.isEmpty(toaster) })}>
    <span>
      {toaster.message}
    </span>
  </div>
);

Toaster.propTypes = {
  toaster: PropTypes.object.isRequired,
};
