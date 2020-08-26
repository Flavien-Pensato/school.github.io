import React, { useContext, useState, Fragment, useCallback } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { DisplayContext } from '../modules/display/display.context';
import firebase from '../config/firebase';
import Add from '../components/Forms/Add';
import Import from '../components/Forms/Import';
import Portal from '../components/Portal';
import ClasseCard from '../components/ClasseCard';
import { Div, Span, Button } from '../elements';

const ClassesWrapper = () => {
  const { schoolYear } = useContext(DisplayContext);
  const [display, setDisplay] = useState(false);
  const [displayImport, setDisplayImport] = useState(false);
  const classesReference = firebase.database().ref(`/${schoolYear}/classes`);
  const [snapshots, loading, error] = useList(classesReference.orderByChild('sort'));

  const handleClose = useCallback(() => setDisplay(false));
  const handleOpen = useCallback(() => setDisplay(true));

  const handleCloseImport = useCallback(() => setDisplayImport(false));
  const handleOpenImport = useCallback(() => setDisplayImport(true));

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
      {display && (
        <Portal>
          <Add handleClose={handleClose} classes={snapshots} />
        </Portal>
      )}
      {displayImport && (
        <Portal>
          <Import handleClose={handleCloseImport} classes={snapshots} />
        </Portal>
      )}
      <Div margin={['20px 0px', '15px 0px']}>
        <Span display="flex" justifyContent="space-between" flexWrap="wrap">
          <Button onClick={handleOpen} marginBottom={['10px', '0px']}>
            <Span>Créer ...</Span>
          </Button>
          <Button onClick={handleOpenImport} marginBottom={['10px', '0px']}>
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
