import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-color: rgba(0,0,0,.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const Button = styled.button`
  font-size: .875rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: #a463f2;
  color: #fff;
  border-radius: 9999px;
  border-style: none;
  border-width: 0;
`;

class ClasseItem extends Component {
  handleClickItem = (event) => {
    event.preventDefault();

    const { removeItem, classe } = this.props;

    removeItem(classe._id);
  }

  render() {
    const { classe } = this.props;

    return (
      <Item >
        <span>{classe.name}</span>
        <Button onClick={this.handleClickItem}>Supprimer</Button>
      </Item>
    );
  }
}

ClasseItem.propTypes = {
  removeItem: PropTypes.func.isRequired,
  classe: PropTypes.object.isRequired,
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

    return (
      <div>
        <List>
          {classes.map(classe => <ClasseItem key={classe.name} classe={classe} removeItem={removeClasse} />)}
        </List>
      </div>
	  );
  }
}

ClassesList.propTypes = {
  fetchClasses: PropTypes.func.isRequired,
  removeClasse: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
