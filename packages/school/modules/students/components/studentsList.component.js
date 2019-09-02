import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import _ from 'lodash';
import { withRouter } from 'next/router';

import { PurpleButton } from '../../../components/button';
import { Trash } from '../../../components/trash';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-color: rgba(0, 0, 0, 0.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const InputGroupe = styled.input`
  border: solid black 1px;
  max-width: 60px;
  margin-right: 50px;
  text-align: center;

  @media (max-width: 700px) {
    margin-right: 10px;
    max-width: 40px;
  }
`;

const InputName = styled.span`
  margin-right: auto;
`;

class StudentItem extends Component {
  handleClickItem = event => {
    event.preventDefault();

    const { removeItem, student } = this.props;

    removeItem(student._id);
  };

  handleChangeGroupe = event => {
    event.preventDefault();

    const { changeItem, student } = this.props;

    changeItem({
      ...student,
      groupe: event.target.value,
    });
  };

  render() {
    const { student } = this.props;

    return (
      <Item>
        <InputName>{student.name}</InputName>
        <InputGroupe type="number" name="groupe" value={student.groupe} onChange={this.handleChangeGroupe} />
        <PurpleButton onClick={this.handleClickItem}>
          <span>Supprimer</span>
          <Trash />
        </PurpleButton>
      </Item>
    );
  }
}

StudentItem.propTypes = {
  removeItem: PropTypes.func.isRequired,
  changeItem: PropTypes.func.isRequired,
  student: PropTypes.shape().isRequired,
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

class StudentsList extends Component {
  componentDidMount() {
    const {
      fetchStudents,
      router: { query },
    } = this.props;

    this.stopFetching = fetchStudents(query.classeId);
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  render() {
    const { students, removeStudent, changeStudent } = this.props;

    const studentsSorted = _.sortBy(students, ['name']);

    return (
      <div>
        <List>
          {studentsSorted.map(student => (
            <StudentItem key={student.name} student={student} removeItem={removeStudent} changeItem={changeStudent} />
          ))}
        </List>
      </div>
    );
  }
}

StudentsList.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  removeStudent: PropTypes.func.isRequired,
  changeStudent: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      classeId: PropTypes.string,
    }),
  }).isRequired,
};

const StudentsListRouted = withRouter(StudentsList);

export { StudentsListRouted as StudentsList };
