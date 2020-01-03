import React, { useContext } from 'react';
import _ from 'lodash';
import { useList } from 'react-firebase-hooks/database';

import { DisplayContext } from '../modules/display/display.context';
import firebase from '../config/firebase';
import ClasseCard from '../components/ClasseCard';

const ClassesWrapper = () => {
  const { schoolYear } = useContext(DisplayContext);
  const [snapshots, loading, error] = useList(
    firebase
      .database()
      .ref(`/${schoolYear}/classes`)
      .orderByChild('sort'),
  );

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return snapshots.map(snap => <ClasseCard key={snap.key} classeId={snap.key} {...snap.val()} />);
};

export default ClassesWrapper;
