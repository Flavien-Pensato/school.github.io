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
  height: 500px;
  width: 700px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const LittleCol = styled.div`
  width: 100px;
  min-width: 100px;
`;

const ItemHeader = styled.div`
  height: 50px;
  min-height: 50px;
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
  width: 250px;
  min-width: 250px;
`;

const Item = styled.div`
  height: 50px;
  padding: 0.4rem;
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
            <ColFixedLeft>
              <ItemHeader className="b--black-20 bb f5 black bg-animate items-center pa3 center fw6">
                <span>
                  Semaine
                </span>
              </ItemHeader>
              {datesSorted.map(date => (
                <Item key={date._id} className="b--black-20 bb f5 black bg-animate items-center pa3 center">
                  <span>
                    Du&nbsp;{moment(date.from, 'YYYY.MM.DD').format('dddd D MMMM')}
                    <br />
                    Au&nbsp;{moment(date.to, 'YYYY.MM.DD').format('dddd D MMMM')}
                  </span>
                </Item>
              ))}
            </ColFixedLeft>


            {classesSorted.map(classe => (
              <LittleCol key={classe._id}>
                <ItemHeader className="tc pa3 bb b--black-20 fw6">
                  <span>
                    {classe.name}
                  </span>
                </ItemHeader>
                {datesSorted.map(date => (
                  <PresenceCase
                    editDate={editDate}
                    date={date}
                    presence={date.classes.includes(classe._id)}
                    classeId={classe._id}
                    key={date._id + classe._id}
                  />
                  ))}
              </LittleCol>
              ))}
            <button onClick={this.handleAddDate}>+</button>
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
