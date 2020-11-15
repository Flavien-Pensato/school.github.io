import React from 'react';
import { Button, Box } from 'rebass';
import { useStateMachine } from 'little-state-machine';
// import useSwr from 'swr';
import Layout from '../components/Layout';
import Planning from '../components/Planning';
import { print } from '../utils/print';
import { nextWeek, prevWeek } from '../utils/store';
import { numeric } from '../utils/date';

const Landing = () => {
  const {
    actions,
    state: { currentWeek },
  } = useStateMachine({
    nextWeek,
    prevWeek,
  });
  // const handleClick = (event) => {
  //   event.preventDefault();

  //   setLoading(true);
  //   generate(week)
  //     .then(() => setLoading(false))
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log(error);
  //     });
  // };
  const from = new Date(currentWeek);
  const to = new Date(from);
  to.setDate(to.getDate() + 4);

  return (
    <Layout>
      <Box>
        Semaine du {from.toLocaleDateString('fr-FR', numeric)} au {to.toLocaleDateString('fr-FR', numeric)}
      </Box>
      <Box display="flex" justifyContent={['space-between', 'space-between']} padding="20px 0px">
        <Box display="flex">
          <Button onClick={actions.prevWeek}>Précédent</Button>
          <Button marginLeft="10px" onClick={actions.nextWeek}>
            Suivant
          </Button>
        </Box>
        <Box display="flex">
          <Button onClick={() => {}} variant="primary">
            <i className="fas fa-sync-alt" />
            <span>&nbsp;Régénérer</span>
          </Button>
          <Button onClick={print} marginLeft="10px" display={['none', 'initial']}>
            <Box className="fas fa-print" color="primary" />
            <span>&nbsp; Imprimer</span>
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Planning startAt={currentWeek} />
      </Box>
    </Layout>
  );
};

export default Landing;
