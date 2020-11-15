import { setStartOfWeek } from '../date';

// "01/10/2020"
const MOCK_NOW = 1578610800000;

jest.useFakeTimers('modern');
jest.setSystemTime(MOCK_NOW);

describe('utils/date.js', () => {
  describe('setStartOfWeek()', () => {
    it('should return 0 after using the function', () => {
      const date = new Date();
      expect(date.getDay()).toEqual(5);
      expect(setStartOfWeek(date).getDay()).toEqual(0);
    });
  });
});
