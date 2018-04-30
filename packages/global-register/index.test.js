import GR from './index';

describe('Core of global register', () => {
  describe('Assure immutabiliy', () => {
    it('should be immutable after a set', () => {
      GR.register('hello', 'hello world');
      
      expect(GR).toEqual(GR);
    });

    it('should be immutable when re require', () => {
      const GR2 = require('./index').default;
      
      expect(GR).toEqual(GR2);
    });
  });
});
