import React, { Fragment, useContext } from 'react';
import { useList } from 'react-firebase-hooks/database';

import { DisplayContext } from '../modules/display/display.context';
import firebase from '../config/firebase';

import { Div, Button, Span } from '../elements';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { schoolYear } = useContext(DisplayContext);
  const tasksReference = firebase.database().ref(`/${schoolYear}/tasks`);
  const [snapshots, loading, error] = useList(tasksReference);

  if (loading) {
    return <span>Loading</span>;
  }
  if (error) {
    return <span>{JSON.stringify(error)}</span>;
  }

  return (
    <Fragment>
      <Div margin={['20px 0px', '15px 0px']}>
        <Button marginBottom={['10px', '0px']}>
          <Span>Créer ...</Span>
        </Button>
      </Div>
      {snapshots.map(snap => (
        <TaskCard key={snap.key} {...snap.val()} />
      ))}
    </Fragment>
  );

  // const [tasks, setTasks] = useState();
  // const { schoolYear } = useContext(DisplayContext);

  // useEffect(() => {
  //   const tasksRef = firebase.database().ref(`/${schoolYear}/tasks`);

  //   const observer = tasksRef.on('value', snapshot => setTasks(snapshot.val()));

  //   return () => {
  //     tasksRef.off('value', observer);
  //   };
  // }, [schoolYear]);

  // const handleSubmitForm = useCallback(
  //   event => {
  //     event.preventDefault();

  //     const tasksRef = firebase.database().ref(`/${schoolYear}/tasks`);
  //     const name = event.target.task.value;

  //     tasksRef.child(slug(name)).set({ name });

  //     // eslint-disable-next-line
  //   event.target.task.value = "";
  //   },
  //   [schoolYear],
  // );

  // return (
  //   <TasksWrapper>
  //     <List>
  //       {_.map(tasks, (task, key) => (
  //         <Task key={key} id={key} {...task} />
  //       ))}
  //     </List>

  //     <Form onSubmit={handleSubmitForm}>
  //       <Fieldset>
  //         <Wrapper>
  //           <Input placeholder="Nouvelle tâche" type="text" name="task" />
  //           <Input type="submit" value="Ajouter" />
  //         </Wrapper>
  //       </Fieldset>
  //     </Form>
  //   </TasksWrapper>
  // );
};

export default Tasks;
