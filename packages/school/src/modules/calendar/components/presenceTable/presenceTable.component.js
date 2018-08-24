import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import PresenceCase from '../presenceCase.component';

import { uuidv4 } from '../../../../utils';

const Container = styled.table`
  overflow: auto;
  margin: 0 auto;
  font-size: .875rem;

  display: block;

  width: 100%;
  max-width: 64rem;
  max-height: 32rem;
`;

export class PresenceTable extends Component {
  componentDidMount() {
    const { fetchClasses, fetchDates } = this.props;

    this.stopFetchingClasses = fetchClasses();
    this.stopFetchingDates = fetchDates();
  }

  componentWillUnmount() {
    this.stopFetchingClasses();
    this.stopFetchingDates();
  }

  handleAddDate = () => {
    const { addDate, dates } = this.props;

    const date = moment().add(dates.length, 'weeks').startOf('week');

    addDate({
      _id: uuidv4(),
      from: date.format('YYYY.MM.DD'),
      to: date.clone().add(4, 'days').format('YYYY.MM.DD'),
      timestamp: date.clone().add(4, 'days').unix(),
      classes: [''],
    });
  }

  render() {
    const { classes, dates, editDate } = this.props;

    return (
      <div className="pa4">
        <Container>
          <thead>
            <tr>
              <th className="fw6 bb b--black-20 pb3 pr3 tl">Semaine</th>
              {classes.map(classe => (
                <th className="fw6 bb b--black-20 pb3 pr3" key={classe.name}>{classe.name}</th>
                ))}
            </tr>
          </thead>
          <tbody className="lh-copy tc">
            {dates.map(date => (
              <tr key={date._id}>
                <td className="pv3 pr3 bb b--black-20 tl">
                    Du&nbsp;{moment(date.from, 'YYYY.MM.DD').format('dddd D MMMM')}
                  <br />
                    Au&nbsp;{moment(date.to, 'YYYY.MM.DD').format('dddd D MMMM')}
                </td>
                {classes.map(classe => (
                  <PresenceCase
                    editDate={editDate}
                    key={classe._id}
                    date={date}
                    presence={date.classes.includes(classe._id)}
                    classeId={classe._id}
                  />
                  ))}
              </tr>
              ))}
            <tr>
              <button onClick={this.handleAddDate}>+</button>
            </tr>
          </tbody>
        </Container>
      </div>
    );
  }
}

PresenceTable.propTypes = {
  addDate: PropTypes.func.isRequired,
  editDate: PropTypes.func.isRequired,
  fetchClasses: PropTypes.func.isRequired,
  fetchDates: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
  dates: PropTypes.arrayOf(PropTypes.object).isRequired,
};
