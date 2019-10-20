import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Date } from '../components/date';
import { useWeeks } from '../modules/week/week.use';
import { useClasses } from '../modules/classes/classes.use';

import PresenceCase from '../components/presenceCase';
import { Wrapper, Grid, LittleCol, ColFixedLeft, Container, ItemHeader } from '../components/table';

moment.locale('fr');

const defaultDates = () => {
  const dates = [];

  const start = moment().startOf('week');

  while (start.month() < 7 || moment().year() === start.year()) {
    const to = start.clone().add(4, 'days');

    dates.push({
      timestamp: to.unix(),
      from: start.format('YYYY-MM-DD'),
      to: to.format('YYYY-MM-DD'),
    });

    start.add(1, 'weeks');
  }

  return dates;
};

const Calendrier = () => {
  const [weeks, setWeeks] = useState();
  const [classes, setClasses] = useState();
  const { weeksRef, addWeek, toggleDisable, toggleClasse } = useWeeks();

  const { classesReference } = useClasses();

  useEffect(() => {
    const observer = weeksRef.on('value', snapshot => {
      setWeeks(snapshot.val());
    });

    classesReference.once('value', snapshot => {
      setClasses(snapshot.val());
    });

    return () => {
      weeksRef.off('value', observer);
    };
  }, [true]);

  const classesSorted = _.sortBy(_.map(classes, (classe, classeId) => ({ ...classe, id: classeId })), ['sort']);
  const weeksSorted = _.sortBy(weeks, ['from']);

  return (
    <Wrapper>
      <Container>
        <Grid>
          <ColFixedLeft>
            <ItemHeader className="b--black-20 bb f5 black bg-animate items-center pa3 center fw6">
              <span>Semaine</span>
            </ItemHeader>
            {defaultDates().map(date => {
              const dateFound = weeksSorted.find(dateWeek => dateWeek.from === date.from);

              return (
                <Date
                  key={date.from}
                  id={date.from}
                  from={date.from}
                  to={date.to}
                  date={dateFound}
                  addWeek={addWeek}
                  toggleDisable={toggleDisable(date.from)}
                  exist
                />
              );
            })}
          </ColFixedLeft>

          {classesSorted.map(classe => (
            <LittleCol key={classe.name}>
              <ItemHeader className="tc pa3 bb b--black-20 fw6">
                <span>{classe.name}</span>
              </ItemHeader>
              {defaultDates().map(date => {
                const dateFound = weeksSorted.find(dateWeek => dateWeek.from === date.from);
                if (!dateFound || dateFound.disable) {
                  return (
                    <div
                      key={date.from + classe.name}
                      className="pa3 bb b--black-20 f5 no-underline  bg-animate  hover-bg-black hover-white items-center center"
                      style={{ height: '50px' }}
                    >
                      <span className="f5 no-underline bg-animate">Vacances</span>
                    </div>
                  );
                }

                return (
                  <PresenceCase
                    date={dateFound}
                    presence={dateFound.classes ? !!dateFound.classes[classe.id] : false}
                    toggleClasse={toggleClasse(dateFound.from)}
                    classeId={classe.id}
                    key={dateFound.from + classe.id}
                    id={dateFound.from}
                  />
                );
              })}
            </LittleCol>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default Calendrier;
