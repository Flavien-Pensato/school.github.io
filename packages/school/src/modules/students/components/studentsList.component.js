import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';

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

class StudentItem extends Component {
  handleClickItem = (event) => {
    event.preventDefault();

    const { removeItem, student } = this.props;

    removeItem(student._id);
  }

  render() {
    const { student } = this.props;

    return (
      <Item >
        <span>{student.name}</span>
        <Button onClick={this.handleClickItem}>Supprimer</Button>
      </Item>
    );
  }
}

StudentItem.propTypes = {
  removeItem: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

class StudentsList extends Component {
  componentDidMount() {
    const { fetchStudents, match: { params } } = this.props;

    this.stopFetching = fetchStudents(params.classeId);
  }

  componentWillUnmount() {
    this.stopFetching();
  }


  render() {
	  const { students, removeStudent } = this.props;

    return (
      <div>
        <List>
          {students.map(student => <StudentItem key={student.name} student={student} removeItem={removeStudent} />)}
        </List>
      </div>
	  );
  }
}

StudentsList.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  removeStudent: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
};

const StudentsListRouted = withRouter(StudentsList);

export { StudentsListRouted as StudentsList };
