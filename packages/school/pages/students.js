import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { List } from '../components/list';
import { Student } from '../components/student';
import { FormStudents } from '../components/formStudents';

import { useStudents } from '../modules/students/studentes.use';
import { forMap } from '../modules/utils';

const Students = ({
  router: {
    query: { classeId },
  },
}) => {
  const { groupes, editStudent, removeStudent, importStudents } = useStudents(classeId);

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
            {groupes &&
              forMap(groupes, groupe => {
                const students = groupe.child('students').val();

                return Object.keys(students).map(studentKey => {
                  const student = students[studentKey];

                  return (
                    <Student
                      editStudent={editStudent}
                      removeStudent={removeStudent}
                      key={student.key}
                      id={student.key}
                      {...student}
                    />
                  );
                });
              })}
          </List>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormStudents classeId={classeId} importStudents={importStudents} />
        </Col>
      </Row>
    </Container>
  );
};

Students.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      classeId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(Students);
