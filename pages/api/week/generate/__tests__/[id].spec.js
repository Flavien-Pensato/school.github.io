import { countTaskDoneByGroupe, findGroupeHowWorkLess } from '../[id]';

describe('generate.js', () => {
  describe('countTaskDoneByGroupe()', () => {
    const groupes = [1, 2, 3];
    const weeks = [
      {
        tasks: {
          refectoire: {
            groupe: 2,
          },
          vaisselle: {
            groupe: 1,
          },
        },
      },
      {
        tasks: {
          refectoire: {
            groupe: 4,
          },
          vaisselle: {
            groupe: 1,
          },
        },
      },
      {
        tasks: {
          vaisselle: {
            groupe: 1,
          },
        },
      },
      {
        tasks: {
          vaisselle: {
            groupe: 4,
          },
        },
      },
    ];
    it('should ', () => {
      expect(countTaskDoneByGroupe('vaisselle', groupes, weeks)).toEqual({ 1: 3, 2: 0, 3: 0 });
      expect(countTaskDoneByGroupe('refectoire', groupes, weeks)).toEqual({ 1: 0, 2: 1, 3: 0 });
    });
  });

  describe('findGroupeHowWorkLess()', () => {
    const groupes = {
      1: 1,
      2: 23,
      3: 4,
    };
    it('should find the groupe with less number', () => {
      expect(findGroupeHowWorkLess(groupes)).toEqual('1');

      groupes['1'] = 5;
      expect(findGroupeHowWorkLess(groupes)).toEqual('3');
    });
  });
});
