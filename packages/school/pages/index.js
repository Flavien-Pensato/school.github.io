import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Router from 'next/router';

import firebase from '../config/firebase';
import { DisplayContext } from '../modules/display/display.context';
// import { useWeek } from '../modules/week/week.use';
// import { Tooltips } from '../components/tooltips';

const handleClick = week => event => {
  event.preventDefault();

  // const addWeek = firebase.functions().httpsCallable('addWeek');

  // addWeek({ from, schoolYear });

  const generate = firebase.functions().httpsCallable('generate');

  generate({
    disable: false,
    from: '2019-11-04',
    to: '2019-11-08',
    classes: {
      '3eme-A': true,
    },
  }).then(console.log);
};

const handlePrint = event => {
  event.preventDefault();

  const printContents = document.getElementById('planning').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};

const HomePage = () => {
  const { date, schoolYear } = useContext(DisplayContext);
  // const week = useWeek(date);

  return (
    <Container>
      <Row>
        <Col>
          <button
            onClick={() => Router.push({ pathname: '/', query: { date: date.add(-1, 'week').format('YYYY-MM-DD') } })}
          >
            Précedent
          </button>
        </Col>
        <Col>
          <button onClick={handleClick(date.startOf('week').format('YYYY-MM-DD'), schoolYear)}>Génerer</button>
        </Col>
        <Col>
          <button onClick={handlePrint}>Imprimé</button>
        </Col>
        <Col>
          <button
            onClick={() => Router.push({ pathname: '/', query: { date: date.add(1, 'week').format('YYYY-MM-DD') } })}
          >
            Suivant
          </button>
        </Col>
      </Row>
      {/* {week && (
        <div id="planning">
          <table className="f7 w-100 center" cellSpacing="0">
            <thead>
              <tr>
                <th className="fw6 bb b--black-20 tl pb3 pr3">Tâche</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3">Classe</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3">Groupe</th>
                <th className="fw6 bb b--black-20 tl pb3 pr3">Étudiants</th>
              </tr>
            </thead>
            <tbody className="lh-copy">
              {Object.keys(week.values.tasks).map(taskId => {
                const task = week.values.tasks[taskId];

                return (
                  <tr key={task.task}>
                    <td className="pv2 pr3 bb b--black-20">{task.task}</td>
                    <td className="pv2 pr3 bb b--black-20">{task.classe}</td>
                    <td className="pv2 pr3 bb b--black-20">{task.groupeName}</td>
                    <td className="pv2 pr3 bb b--black-20">
                      {task.students ? task.students.map(student => student.name).join(', ') : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )} */}
    </Container>
  );
};

export default HomePage;
