import GR from './index';
import { notDeepEqual } from 'assert';

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

  describe('Test registration', () => {
    it('should have save value', () => {
      GR.register('test', 'test value');

      expect(GR.getValue('test')).toEqual('test value');
    });

    it('should save number', () => {
      GR.register('testNumber', 190);
      
      expect(GR.getValue('testNumber')).toEqual(190);
    });

    it('should save object', () => {
      GR.register('testObject', { foo: 'foo', bar: 'bar'});
      
      expect(GR.getValue('testObject')).toEqual({ foo: 'foo', bar: 'bar'});
    });

    it('should throw key already set', () => {
      expect(() => GR.register('testObject', { bob: 'bob', bar: 'bar'})).toThrowError('Key already register');
    });

    it('should set with force', () => {
      expect(() => GR.register('testObject', { bob: 'bob', bar: 'bar'}, true)).not.toThrowError('Key already register');
    });

    it('should set with force', () => {
      GR.register('routes.toto', 100);

      expect(GR.getValue('routes.toto')).toEqual(100);
    });

    it('should get nodes', () => {
      expect(GR.getNodes('.')).toEqual(["hello", "test", "testNumber", "testObject", "routes"]);
      expect(GR.getNodes('routes')).toEqual(["toto"]);
    });
  });
});
