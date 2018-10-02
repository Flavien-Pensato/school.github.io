import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';

import PresenceCase from '../presenceCase.component';

import { uuidv4 } from '../../../../utils';

moment.locale('fr');

const Container = styled.div`
  display: grid;
  overflow: auto;
  height: 300px;
  width: 600px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Col = styled.div`
  width: 150px;
  min-width: 150px;
`;

const ItemHeader = styled.div`
  height: 100px;
  min-height: 100px;
  position: sticky;
  position: -webkit-sticky;
  background: white;
  top: 0;
`;

const ColFixedLeft = styled.div`
  position: sticky;
  left: 0;
  z-index: 9998;
  background: white;
`;

const ColFixedRight = styled.div`
  position: sticky;
  right: 0;
  z-index: 9998;
  background: white;
`;

const Item = styled.div`
  height: 50px;
  border: 1px solid gray;
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

    const date = moment(dates[dates.length - 1].from, 'YYYY.MM.DD').add(1, 'weeks');

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

    const classesSorted = _.sortBy(classes, ['name']);
    const datesSorted = _.sortBy(dates, ['timestamp']);

    return (
      <div className="pa4">
        <Container>
          <Grid>
            <thead>
              <tr>
                <th className="fw6 bb b--black-20 pb3 pr3 tl">Semaine</th>
                {classesSorted.map(classe => (
                  <th className="fw6 bb b--black-20 pb3 pr3" key={classe.name}>{classe.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="lh-copy tc">
              {datesSorted.map(date => (
                <tr key={date._id}>
                  <td className="pv3 pr3 bb b--black-20 tl">
                    Du&nbsp;{moment(date.from, 'YYYY.MM.DD').format('dddd D MMMM')}
                    <br />
                    Au&nbsp;{moment(date.to, 'YYYY.MM.DD').format('dddd D MMMM')}
                  </td>
                  {classesSorted.map(classe => (
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
          </Grid>
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
