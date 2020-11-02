export const nextWeek = (state) => {
  const currentWeek = new Date(state.currentWeek);

  currentWeek.setDate(currentWeek.getDate() + 7);

  return {
    ...state,
    currentWeek: currentWeek.toISOString(),
  };
};

export const prevWeek = (state) => {
  const currentWeek = new Date(state.currentWeek);

  currentWeek.setDate(currentWeek.getDate() - 7);

  return {
    ...state,
    currentWeek: currentWeek.toISOString(),
  };
};
