import React, { useState } from 'react';
import { Text, Button, Box, Flex } from 'theme-ui';
import { useStateMachine } from 'little-state-machine';

import Layout from '../components/Layout';
import Planning from '../components/Planning';
import { print } from '../utils/print';
import { nextWeek, prevWeek } from '../utils/store';
import { numeric } from '../utils/date';

const Landing = () => {
  const [printMode, setPrintMode] = useState()
  const {
    actions,
    state: { currentWeek },
  } = useStateMachine({
    nextWeek,
    prevWeek,
  });

  const handlePrint = () => {
    setPrintMode(true)
    window.print()
    setPrintMode(false)
  }
  const from = new Date(currentWeek);
  const to = new Date(from);
  to.setDate(to.getDate() + 4);

  if (printMode) {
    return (
      <>
        <Box mb="20px">
          Semaine du <Text as="strong" color="primary">{from.toLocaleDateString('fr-FR', numeric)}</Text> au <Text as="strong" color="primary">{to.toLocaleDateString('fr-FR', numeric)}</Text>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          <Planning startAt={currentWeek.toISOString()} />
        </Box>
      </>
    )
  }

  return (
    <Layout>
      <Box>
        Semaine du <Text as="strong" color="primary">{from.toLocaleDateString('fr-FR', numeric)}</Text> au <Text as="strong" color="primary">{to.toLocaleDateString('fr-FR', numeric)}</Text>
      </Box>
      <Flex padding="20px 0px">
        <Flex>
          <Button onClick={actions.prevWeek}>Précédent</Button>
          <Button marginLeft="10px" onClick={actions.nextWeek}>
            Suivant
          </Button>
        </Flex>
        <Flex ml="auto">
          <Button onClick={() => {}} variant="primary">
            <i className="fas fa-sync-alt" />
            <span>&nbsp;&nbsp;Régénérer</span>
          </Button>
          <Button onClick={handlePrint} marginLeft="10px" display={['none', 'initial']}>
            <i className="fas fa-print" color="primary" />
            <span>&nbsp;&nbsp;Imprimer</span>
          </Button>
        </Flex>
      </Flex>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Planning startAt={currentWeek.toString()} />
      </Box>
    </Layout>
  );
};

export default Landing;
