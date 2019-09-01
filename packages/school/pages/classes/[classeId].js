import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { List } from '../../components/list';
import { Student } from '../../components/student';
import { FormStudents } from '../../components/formStudents';

import firebase from '../../config/firebase';

// import { ConnectedStudentForm } from '../../modules/students/components/studentForm.connector';

const studentsRef = '/students/';

class ClassesIdWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { students: [] };
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
  }

  render() {
    const { students } = this.state;
    const {
      router: {
        query: { classeId },
      },
    } = this.props;

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
                <Student key={student.key} id={student.key} {...student.values} />
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

ClassesIdWrapper.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      classeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ClassesIdWrapper);
