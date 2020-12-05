'use strict';

const fs = require('fs');

fs.readFile('weeks.json', (err, data) => {
    if (err) throw err;
    const object = JSON.parse(data);

    const newObject = Object.keys(object).map(weekKey => {
      const week = object[weekKey]

      return {
        startAt: {
          "$date": new Date(week.from).toISOString()
        },
        endAt: {
          "$date": new Date(week.to).toISOString(),
        },
        isHolliday: week.disable,
        classes: Object.keys(week.classes || {}),
        tasks: wee
      }
    })

    fs.writeFileSync('student-2.json', JSON.stringify(newObject));
});
