import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useList } from 'react-firebase-hooks/database';

import { DisplayContext } from '../../modules/display/display.context';
import firebase from '../../config/firebase';
import StudentCard from '../StudentCard';

const StudentList = ({ classeId }) => {
  const { schoolYear } = useContext(DisplayContext);
  const studentsReference = firebase
    .database()
    .ref(`/${schoolYear}/students`)
    .orderByChild('classeId')
    .equalTo(classeId);
  const [snapshots, loading, error] = useList(studentsReference);

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return snapshots.map(snapshot => <StudentCard key={snapshot.key} studentId={snapshot.key} {...snapshot.val()} />);
};

StudentList.propTypes = {
  classeId: PropTypes.string.isRequired,
};

export default StudentList;
