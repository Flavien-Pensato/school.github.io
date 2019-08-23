import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Link from 'next/link';
import _ from 'lodash';

import { PurpleButton } from '../../../components/button';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-color: rgba(0, 0, 0, 0.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

class ClasseItem extends Component {
  handleClickItem = event => {
    event.preventDefault();

    const { removeItem, classe } = this.props;

    removeItem(classe._id);
  };

  render() {
    const { classe } = this.props;

    return (
      <Item>
        <Link href={`/classes/${classe._id}`}>
          <span>{classe.name}</span>
        </Link>
        <PurpleButton onClick={this.handleClickItem}>Supprimer</PurpleButton>
      </Item>
    );
  }
}

ClasseItem.propTypes = {
  removeItem: PropTypes.func.isRequired,
  classe: PropTypes.shape().isRequired,
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export class ClassesList extends Component {
  componentDidMount() {
    const { fetchClasses } = this.props;

    this.stopFetching = fetchClasses();
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  render() {
    const { classes, removeClasse } = this.props;

    const classesSorted = _.sortBy(classes, ['name']);

    return (
      <div>
        <List>
          {classesSorted.map(classe => (
            <ClasseItem key={classe.name} classe={classe} removeItem={removeClasse} />
          ))}
        </List>
      </div>
    );
  }
}

ClassesList.propTypes = {
  fetchClasses: PropTypes.func.isRequired,
  removeClasse: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
