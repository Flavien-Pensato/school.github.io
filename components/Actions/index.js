import React, { useContext } from 'react';
import Router from 'next/router';
import { DisplayContext } from '../../modules/display/display.context';

import Button from '../../elements/Button';
import { Div, I } from '../../elements';

const handlePrint = event => {
  event.preventDefault();

  const mywindow = window.open('', 'PRINT', 'height=400,width=600');

  mywindow.document.write(`<html><head><title>${document.title}</title>`);
  mywindow.document.write('</head><body>');
  mywindow.document.write('<style type="text/css"> p { font-size: 24px; }</style>');
  mywindow.document.write(`<h1>${document.title}</h1>`);
  mywindow.document.write(document.getElementById('planning').innerHTML);
  mywindow.document.write('</body></html>');

  mywindow.document.close();
  mywindow.focus();

  mywindow.print();
  mywindow.close();

  return true;
};

const Actions = () => {
  const { date } = useContext(DisplayContext);

  const datePrev = date.clone().add(-1, 'week');
  const dateNext = date.clone().add(1, 'week');

  return (
    <Div display="flex" justifyContent="space-between" padding="20px 10px" maxWidth="60rem">
      <Button
        onClick={() => Router.push({ pathname: '/home', query: { date: datePrev.format('YYYY-MM-DD') } })}
        padding="5px"
        background="none"
        borderColor="secondary"
        borderWidth="2px"
      >
        <I className="fas fa-backward" color="primary" />
        &nbsp;Retourner au {datePrev.format('DD/MM/YYYY')}
      </Button>
      <Button onClick={() => {}} padding="5px" background="none" borderColor="secondary" borderWidth="2px">
        <I className="fas fa-recycle" color="primary" />
        &nbsp;Re-générer
      </Button>
      <Button onClick={handlePrint} padding="5px" background="none" borderColor="secondary" borderWidth="2px">
        <I className="fas fa-print" color="primary" />
        &nbsp; Imprimé
      </Button>
      <Button
        onClick={() => Router.push({ pathname: '/home', query: { date: dateNext.format('YYYY-MM-DD') } })}
        padding="5px"
        background="none"
        borderColor="secondary"
        borderWidth="2px"
      >
        Avancer au {dateNext.format('DD/MM/YYYY')}
        &nbsp;
        <I className="fas fa-forward" color="primary" />
      </Button>
    </Div>
  );
};

export default Actions;
