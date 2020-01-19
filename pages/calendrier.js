import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import moment from 'moment';

import { Date } from '../components/date';
import { useWeeks } from '../modules/week/week.use';
import { useClasses } from '../modules/classes/classes.use';

import PresenceCase from '../components/presenceCase';

export const Container = styled.div`
  display: grid;
  overflow: auto;
  height: 500px;
  width: 100%;
  max-width: 48rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const Wrapper = styled.div`
  margin: 0 auto;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  height: 50px;

  border-color: rgba(0, 0, 0, 0.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export const LittleCol = styled.div`
  width: 100px;
  min-width: 100px;
`;

export const ItemHeader = styled.div`
  height: 50px;
  min-height: 50px;
  position: sticky;
  position: -webkit-sticky;
  background: white;
  top: 0;
`;

export const ColFixedLeft = styled.div`
  position: sticky;
  left: 0;
  z-index: 100;
  background: white;
  width: 250px;
  min-width: 250px;
`;

export const ColFixedTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 9998;
  background: white;
  height: 50px;
  display: flex;
`;

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
        <ColFixedTop>
          <Item style={{ width: '250px', backgroundColor: 'white', zIndex: 10001, position: 'sticky', left: 0 }}>
            <span>Semaine</span>
          </Item>
          {classesSorted.map(classe => (
            <Item style={{ width: '100px', backgroundColor: 'white', zIndex: 10000 }}>
              <span>{classe.name}</span>
            </Item>
          ))}
        </ColFixedTop>
        <Grid>
          <ColFixedLeft>
            {defaultDates().map(date => {
              const dateFound = weeksSorted.find(dateWeek => dateWeek.from === date.from);

              return (
                <Item>
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
                </Item>
              );
            })}
          </ColFixedLeft>
          {classesSorted.map(classe => (
            <LittleCol key={classe.name}>
              {defaultDates().map(date => {
                const dateFound = weeksSorted.find(dateWeek => dateWeek.from === date.from);
                if (!dateFound || dateFound.disable) {
                  return (
                    <Item>
                      <span>Vacances</span>
                    </Item>
                  );
                }

                return (
                  <Item>
                    <PresenceCase
                      date={dateFound}
                      presence={dateFound.classes ? !!dateFound.classes[classe.id] : false}
                      toggleClasse={toggleClasse(dateFound.from)}
                      classeId={classe.id}
                      key={dateFound.from + classe.id}
                      id={dateFound.from}
                    />
                  </Item>
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
