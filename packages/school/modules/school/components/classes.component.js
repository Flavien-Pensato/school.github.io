import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ClassItem } from './classeItem.component';

export const Classes = ({ classes }) => (
  <div>
    <ul className="list pl0 measure center">
      {_.map(_.orderBy(classes, [classe => classe.name.toLowerCase()], ['asyn']), (classe, index) => (
        <ClassItem key={index} {...classe} />
      ))}
    </ul>
  </div>
);

Classes.defaultProps = {
  classes: [],
};

Classes.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape()),
};
