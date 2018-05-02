import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export const BodyCalendar = ({ currentWeek, weeks }) => {
  const week = _.find(weeks, ({ _id }) => _id === currentWeek.format('WY'));

  return (
    <div id="planning">
      {
				week ?
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
					: <span>Pas de semaine programmée</span>
			}
    </div>
  );
};

BodyCalendar.defaultProps = {
  weeks: [],
  currentWeek: {},
};

BodyCalendar.propTypes = {
  weeks: PropTypes.array,
  currentWeek: PropTypes.object,
};

export default BodyCalendar;
