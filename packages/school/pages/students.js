import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { List } from '../components/list';
import { Student } from '../components/student';
import { FormStudents } from '../components/formStudents';

import firebase from '../config/firebase';

// import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';

const studentsRef = '/students/';
const groupesRef = '/groupes/';

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = { students: [], groupes: [] };
  }

  componentDidMount() {
    const {
      router: {
        query: { classeId },
      },
    } = this.props;

    this.reference = firebase
      .database()
      .ref(studentsRef)
      .orderByChild('classeId')
      .equalTo(classeId);

    this.referenceGroupe = firebase
      .database()
      .ref(groupesRef)
      .orderByChild('classeId')
      .equalTo(classeId);

    this.observer = this.reference.on('value', snapshot => {
      const students = [];

      if (snapshot.exists()) {
        snapshot.forEach(student => {
          students.push({ key: student.key, values: student.val() });
        });
      }

      this.setState({
        students,
      });
    });

    this.observerGroupes = this.referenceGroupe.on('value', snapshot => {
      const groupes = [];

      if (snapshot.exists()) {
        snapshot.forEach(student => {
          groupes.push({ key: student.key, values: student.val() });
        });
      }

      this.setState({
        groupes,
      });
    });
  }

  render() {
    const { students, groupes } = this.state;
    const {
      router: {
        query: { classeId },
      },
    } = this.props;

    console.log(groupes);

    return (
      <Container>
        <Row>
          <Col>
            <Nav>
              <Nav.Item>
                <Link href="/classes">
                  <Nav.Link href="/classes">Retour</Nav.Link>
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <List>
              {students.map(student => (
                <Student
                  key={student.key}
                  wrongGroupe={!groupes.find(groupe => groupe.values.number === student.values.groupe)}
                  id={student.key}
                  {...student.values}
                />
              ))}
            </List>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormStudents classeId={classeId} />
          </Col>
        </Row>
      </Container>
    );
  }
}

Students.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      classeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Students);
