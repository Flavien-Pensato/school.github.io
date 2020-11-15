export const print = () => {
  const mywindow = window.open('', 'PRINT', 'height=400,width=600');

  mywindow.document.write('<html><body>');
  mywindow.document.write(document.getElementById('planning').innerHTML);
  mywindow.document.write('</body></html>');

  mywindow.document.close();
  mywindow.focus();

  mywindow.print();
  mywindow.close();

  return true;
};
