import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class BodyCalendar extends Component {
  componentDidMount() {
    const { fetchWeek } = this.props;

    this.stopFetching = fetchWeek();
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  render() {
    const { week } = this.props;

    if (_.isEmpty(week)) {
      return (
        <span>Pas de semaine programmée</span>
      );
    }

    return (
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
            {week.tasks.map(task => (
              <tr key={task.task.name}>
                <td className="pv2 pr3 bb b--black-20">{task.task.name.replace(/ /g, '\u00a0')}</td>
                <td className="pv2 pr3 bb b--black-20">{task.classe.replace(/ /g, '\u00a0')}</td>
                <td className="pv2 pr3 bb b--black-20">{task.groupe}</td>
                <td className="pv2 pr3 bb b--black-20">{task.students ? task.students.join(', ') : ''}</td>
              </tr>
                  ))}
          </tbody>
        </table>
      </div>
    );
  }
}

BodyCalendar.defaultProps = {
  week: {},
};

BodyCalendar.propTypes = {
  week: PropTypes.object,
  fetchWeek: PropTypes.func.isRequired,
};
