import React, { useContext, Fragment, useCallback } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { DisplayContext } from '../modules/display/display.context';
import firebase from '../config/firebase';
import ClasseCard from '../components/ClasseCard';
import { Div, Span, Button } from '../elements';

const ClassesWrapper = () => {
  const { schoolYear } = useContext(DisplayContext);
  const classesReference = firebase.database().ref(`/${schoolYear}/classes`);
  const [snapshots, loading, error] = useList(classesReference.orderByChild('sort'));

  const onDelete = useCallback(event => {
    event.stopPropagation();
    event.preventDefault();

    if (
      window.confirm(
        'Êtes-vous sûre de vouloir supprimer cette classe (Tous les élèves et groupes concernés seront supprimé !) ?',
      )
    ) {
      // classesReference.child(classeId).remove();
    }
  });

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <Fragment>
      <Div margin={['20px 0px', '15px 0px']}>
        <Span display="flex" justifyContent="space-between" flexWrap="wrap">
          <Button onClick={onDelete} marginBottom={['10px', '0px']}>
            <Span>Ajouter un élève</Span>
          </Button>
          <Button onClick={onDelete} marginBottom={['10px', '0px']}>
            <Span>Créer une classe</Span>
          </Button>
          <Button onClick={onDelete} marginBottom={['10px', '0px']}>
            <Span>Importer une classe</Span>
          </Button>
          <Button onClick={onDelete} marginBottom={['10px', '0px']}>
            <Span>Supprimer une classe</Span>
          </Button>
        </Span>
      </Div>
      {snapshots.map(snap => (
        <ClasseCard key={snap.key} classesReference={classesReference} classeId={snap.key} {...snap.val()} />
      ))}
    </Fragment>
  );
};

export default ClassesWrapper;
