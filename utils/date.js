export const numeric = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export const setStartOfWeek = (date) => {
  if (!date || !(date instanceof Date)) {
    return;
  }
  const day = date.getDay();
  date.setHours(0, 0, 0, 0);

  date.setDate(date.getDate() - day);
};

export const sortDates = (weeks) => weeks.sort((a, b) => new Date(a.from) - new Date(b.from));

export const getAllNextWeekBeforeHoliday = () => {
  const nextDates = [];
  const currentDate = new Date();
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  setStartOfWeek(date);

  while (date.getMonth() < 7 || currentDate.getFullYear() === date.getFullYear()) {
    const to = new Date(date.getTime());
    to.setDate(to.getDate() + 4);

    nextDates.push({
      startAt: date.toISOString(),
      endAt: to.toISOString(),
    });

    date.setDate(date.getDate() + 7);
  }

  return nextDates;
};
