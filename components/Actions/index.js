import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { DisplayContext } from '../../modules/display/display.context';

import Button from '../../elements/Button';
import { Div, I, Span } from '../../elements';

const Actions = ({ generate }) => {
  const { date } = useContext(DisplayContext);

  const datePrev = date.clone().add(-1, 'week');
  const dateNext = date.clone().add(1, 'week');

  const handlePrint = event => {
    event.preventDefault();

    const mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write(`<html><head><title>${document.title}</title>`);
    mywindow.document.write(
      '<style type="text/css"> * { font-size: 16px; font-family: system-ui, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif; } h1 { font-size: 22px; } body { text-align: center; } table { border-collapse:separate; border-spacing: 1.1em 1em;}</style>',
    );
    mywindow.document.write('</head><body>');
    mywindow.document.write(
      `<h1>Semain du ${date.clone().format('LL')} au ${date
        .clone()
        .add('days', 4)
        .format('LL')}</h1>`,
    );
    mywindow.document.write(document.getElementById('planning').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();

    return true;
  };

  return (
    <Div display="flex" justifyContent={['space-between', 'space-between']} padding="20px 0px">
      <Span display="flex">
        <Button onClick={() => Router.push({ pathname: '/home', query: { date: datePrev.format('YYYY-MM-DD') } })}>
          Précédent
        </Button>
        <Button
          marginLeft="10px"
          onClick={() => Router.push({ pathname: '/home', query: { date: dateNext.format('YYYY-MM-DD') } })}
        >
          Suivant
        </Button>
      </Span>
      <Span display="flex">
        <Button onClick={generate} variant="primary">
          <I className="fas fa-sync-alt" />
          <span>&nbsp;Régénérer</span>
        </Button>
        <Button onClick={handlePrint} marginLeft="10px" display={['none', 'initial']}>
          <I className="fas fa-print" color="primary" />
          <span>&nbsp; Imprimer</span>
        </Button>
      </Span>
    </Div>
  );
};

Actions.propTypes = {
  generate: PropTypes.func.isRequired,
};

export default Actions;
