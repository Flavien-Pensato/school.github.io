import React from "react";
import styled from "@emotion/styled";
import useSWR from "swr";
import { sortDates, getAllNextWeekBeforeHoliday } from "../utils/date";
import { DateComponent } from "../components/date";
import { isDateSame } from "../modules/week/week.utils";

import PresenceCase from "../components/presenceCase";

import fetcher from "../utils/fetch";
import Layout from "../components/Layout";

export const Container = styled.div`
  display: grid;
  overflow: auto;
  height: 500px;
  width: 100%;
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
  align-items: center;
  justify-content: center;

  border-color: rgba(0, 0, 0, 0.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

export const ItemCol = styled(Item)`
  height: 50px;

  ${(props) => (props.presence ? `background-color: #61b361;` : ``)}
`;

export const LittleCol = styled.div`
  width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
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
  justify-content: left;
  background: white;
  width: 200px;
`;

export const ColFixedTop = styled.div`
  position: sticky;
  top: 0;
  z-index: 9998;
  background: white;
  height: 50px;
  display: flex;
`;

const Calendrier = () => {
  const nexDates = getAllNextWeekBeforeHoliday();

  const { data: weeks, mutate } = useSWR("/api/weeks", {
    initialData: [],
  });

  const { data: classes } = useSWR("/api/classes", {
    initialData: [],
  });

  const toggleDisable = (weekId) => () => {
    fetcher(`/api/week/toggleHoliday/${weekId}`, {
      method: "PUT",
    }).then((newWeek) => {
      mutate(
        weeks.map((element) => (element._id === weekId ? newWeek : element)),
        false
      );
    });
  };

  const toggleClasse = (weekId, classe) => () => {
    fetcher(`/api/week/toggleClasse/${weekId}`, {
      method: "PUT",
      body: classe,
    }).then((newWeek) => {
      mutate(
        weeks.map((element) => (element._id === weekId ? newWeek : element)),
        false
      );
    });
  };

  const addWeek = (week) => {
    fetcher("/api/week/new", {
      method: "POST",
      body: JSON.stringify(week),
    }).then((response) => {
      if (response) {
        mutate([...weeks, response], false);
      }
    });
  };

  return (
    <Layout>
      <Wrapper>
        <Container>
          <ColFixedTop>
            <Item
              style={{
                width: "200px",
                backgroundColor: "white",
                zIndex: 10001,
                position: "sticky",
                left: 0,
              }}
            >
              <span>Semaine</span>
            </Item>
            {classes.map((classe) => (
              <Item
                key={classe}
                style={{
                  width: "75px",
                  backgroundColor: "white",
                  zIndex: 10000,
                }}
              >
                <span>{classe}</span>
              </Item>
            ))}
          </ColFixedTop>
          <Grid>
            <ColFixedLeft>
              {sortDates(nexDates).map((date) => {
                const dateFound = weeks.find((dateWeek) =>
                  isDateSame(dateWeek.startAt, date.startAt)
                );

                return (
                  <ItemCol
                    key={date.startAt}
                    style={{ justifyContent: "space-between" }}
                  >
                    <DateComponent
                      startAt={date.startAt}
                      endAt={date.endAt}
                      date={dateFound}
                      addWeek={addWeek}
                      toggleDisable={toggleDisable(dateFound && dateFound._id)}
                      exist
                    />
                  </ItemCol>
                );
              })}
            </ColFixedLeft>
            {classes.map((classe) => (
              <LittleCol key={classe}>
                {nexDates.map((date) => {
                  const dateFound = weeks.find((dateWeek) =>
                    isDateSame(dateWeek.startAt, date.startAt)
                  );

                  if (!dateFound || dateFound.i1sHolliday) {
                    return (
                      <ItemCol key={date.startAt}>
                        <span>Vacances</span>
                      </ItemCol>
                    );
                  }

                  return (
                    <ItemCol
                      key={date.startAt}
                      presence={dateFound.classes.includes(classe)}
                    >
                      <PresenceCase
                        date={dateFound}
                        presence={dateFound.classes.includes(classe)}
                        toggleClasse={toggleClasse(
                          dateFound && dateFound._id,
                          classe
                        )}
                        classeId={classe}
                        key={dateFound.startAt + classe}
                        id={dateFound.startAt}
                      />
                    </ItemCol>
                  );
                })}
              </LittleCol>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </Layout>
  );
};

export default Calendrier;
