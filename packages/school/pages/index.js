import React, { Component, Fragment } from 'react';
import { Container } from 'react-bootstrap';

import firebase from '../config/firebase';
import { DisplayContext } from '../modules/display/display.context';

const handleClick = (from, schoolYear) => event => {
  event.preventDefault();

  const addWeek = firebase.functions().httpsCallable('addWeek');

  addWeek({ from, schoolYear });
};

const handlePrint = event => {
  event.preventDefault();

  const printContents = document.getElementById('planning').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};

const weeksRef = '/weeks/';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { weeks: [] };
  }

  componentDidMount() {
    this.reference = firebase
      .database()
      .ref(weeksRef)
      .orderByChild('schoolYear')
      .equalTo('2019-2020');
    this.observer = this.reference.on('value', snapshot => {
      const weeks = [];

      if (snapshot.exists()) {
        snapshot.forEach(week => {
          weeks.push({ key: week.key, values: week.val() });
        });
      }

      this.setState({
        weeks,
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
  }

  render() {
    const { weeks } = this.state;

    return (
      <Container>
        <DisplayContext.Consumer>
          {({ currentWeek, schoolYear }) => (
            <Fragment>
              <button onClick={handleClick(currentWeek.startOf('week').format('YYYY.MM.DD'), schoolYear)}>
                Génerer
              </button>
              <button onClick={handlePrint}>Imprimé</button>
              {weeks[0] && (
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
                      {Object.keys(weeks[0].values).map(taskId => {
                        const task = weeks[0].values[taskId];

                        if (taskId === 'from' || taskId === 'schoolYear') {
                          return null;
                        }

                        return (
                          <tr key={task.name}>
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
              )}
            </Fragment>
          )}
        </DisplayContext.Consumer>
      </Container>
    );
  }
}

export default HomePage;
