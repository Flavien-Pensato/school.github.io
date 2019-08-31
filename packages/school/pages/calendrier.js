import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

import firebase from '../config/firebase';

import { DisplayContext } from '../modules/display/display.context';

import PresenceCase from '../modules/calendar/components/presenceCase.component';
import { Wrapper, Grid, LittleCol, ColFixedLeft, Container, Item, ItemHeader } from '../components/table';

import { uuidv4 } from '../modules/utils';

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

    this.reference = firebase
      .database()
      .ref(dateRef)
      .orderByChild('timestamp')
      .startAt(
        moment()
          .startOf('week')
          .unix(),
      );

    this.observer = this.reference.on('value', snapshot => {
      this.setState({
        dates: snapshot.val() ? Object.values(snapshot.val()) : [],
      });
    });

    this.observerClasses = this.referenceClasses.on('value', snapshot => {
      this.setState({
        classes: snapshot.val() ? Object.values(snapshot.val()) : [],
      });
    });
  }

  componentWillUnmount() {
    this.reference.off('value', this.observer);
    this.referenceClasses.off('value', this.observerClasses);
  }

  handleAddDate = date => () => {
    const uuid = uuidv4();

    firebase
      .database()
      .ref(dateRef + uuid)
      .set({
        ...date,
        _id: uuid,
        classes: [],
      });
  };

  render() {
    const { dates, classes } = this.state;

    const classesSorted = _.sortBy(classes, ['name']);
    const datesSorted = _.sortBy(dates, ['timestamp']);

    return (
      <Wrapper>
        <Container>
          <Grid>
            <ColFixedLeft>
              <ItemHeader className="b--black-20 bb f5 black bg-animate items-center pa3 center fw6">
                <span>Semaine</span>
              </ItemHeader>
              {this.defaultDate.map(date => (
                <Item key={date.from} className="b--black-20 bb f5 black bg-animate items-center pa3 center">
                  <span>
                    Du&nbsp;{moment(date.from, 'YYYY.MM.DD').format('dddd D MMMM')}
                    <br />
                    Au&nbsp;{moment(date.to, 'YYYY.MM.DD').format('dddd D MMMM')}
                  </span>

                  {datesSorted.find(dateWeek => dateWeek.from === date.from) ? (
                    <button onClick={this.handleAddDate(date)}>-</button>
                  ) : (
                    <button onClick={this.handleAddDate(date)}>+</button>
                  )}
                </Item>
              ))}
            </ColFixedLeft>

            {classesSorted.map(classe => (
              <LittleCol key={classe._id}>
                <ItemHeader className="tc pa3 bb b--black-20 fw6">
                  <span>{classe.name}</span>
                </ItemHeader>
                {datesSorted.map(date => (
                  <PresenceCase
                    date={date}
                    presence={date.classes.includes(classe._id)}
                    classeId={classe._id}
                    key={date._id + classe._id}
                  />
                ))}
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
