import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import firebase from '../config/firebase';

import { DisplayContext } from '../modules/display/display.context';

import { Date } from '../components/date';

import PresenceCase from '../components/presenceCase';
import { Wrapper, Grid, LittleCol, ColFixedLeft, Container, ItemHeader } from '../components/table';

moment.locale('fr');

const dateRef = '/dates/';
const classeRef = '/classes/';

class Calendrier extends Component {
  constructor(props) {
    super(props);

    this.defaultDate = [];

    const start = moment().startOf('week');

    while (start.month() < 7 || moment().year() === start.year()) {
      const to = start.clone().add(4, 'days');

      this.defaultDate.push({
        timestamp: to.unix(),
        from: start.format('YYYY.MM.DD'),
        to: to.format('YYYY.MM.DD'),
      });

      start.add(1, 'weeks');
    }

    this.state = { dates: [], classes: [] };
  }

  componentDidMount() {
    const { schoolYear } = this.context;

    this.referenceClasses = firebase
      .database()
      .ref(classeRef)
      .orderByChild('schoolYear')
      .equalTo(schoolYear);

    this.observerClasses = this.referenceClasses.on('value', snapshot => {
      const classes = [];

      if (snapshot.exists()) {
        snapshot.forEach(classe => {
          classes.push({ key: classe.key, values: classe.val() });
        });
      }

      this.setState({
        classes,
      });
    });

    this.referenceDates = firebase
      .database()
      .ref(dateRef)
      .orderByChild('timestamp')
      .startAt(
        moment()
          .startOf('week')
          .unix(),
      );

    this.observerDates = this.referenceDates.on('value', snapshot => {
      const dates = [];

      if (snapshot.exists()) {
        snapshot.forEach(date => {
          dates.push({ key: date.key, values: date.val() });
        });
      }

      this.setState({
        dates,
      });
    });
  }

  componentWillUnmount() {
    this.referenceDates.off('value', this.observer);
    this.referenceClasses.off('value', this.observerClasses);
  }

  render() {
    const { dates, classes } = this.state;

    const classesSorted = _.sortBy(classes, ['values.sort']);
    const datesSorted = _.sortBy(dates, ['values.timestamp']);

    return (
      <Wrapper>
        <Container>
          <Grid>
            <ColFixedLeft>
              <ItemHeader className="b--black-20 bb f5 black bg-animate items-center pa3 center fw6">
                <span>Semaine</span>
              </ItemHeader>
              {this.defaultDate.map(date => {
                const dateFound = datesSorted.find(dateWeek => dateWeek.values.from === date.from);

                if (dateFound) {
                  return <Date key={date.from} date={dateFound.values} id={dateFound.key} exist />;
                }

                return <Date key={date.from} date={date} exist={false} />;
              })}
            </ColFixedLeft>

            {classesSorted.map(classe => (
              <LittleCol key={classe.key}>
                <ItemHeader className="tc pa3 bb b--black-20 fw6">
                  <span>{classe.values.name}</span>
                </ItemHeader>
                {datesSorted.map(date =>
                  date.values.disable ? (
                    <div key={date.key + classe.key} style={{ height: '50px' }}>
                      <span className="f5">Vacances</span>
                    </div>
                  ) : (
                    <PresenceCase
                      date={date.values}
                      presence={(date.values.classes || []).includes(classe.key)}
                      classeId={classe.key}
                      key={date.key + classe.key}
                      id={date.key}
                    />
                  ),
                )}
              </LittleCol>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    );
  }
}

Calendrier.contextType = DisplayContext;

export default Calendrier;
