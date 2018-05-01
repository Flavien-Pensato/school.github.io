import _ from 'lodash';
class GR {
  constructor() {
    if (!GR.instance) {
      this._data = {}
      GR.instance = this;
    }

    return GR.instance;
  }

  register = (key, value, forced = false) => {
    if (!_.get(this._data, key, undefined) || forced) {
      return _.set(this._data, key, value);
    }

    throw new Error('Key already register');
  };

  getValue = (key) => {
    if (key === '.') {
      return this._data;
    }

    return _.get(this._data, key, undefined);
  };

  getNodes = (key) => {
    return _.keys(this.getValue(key));
  };
};

const instance = new GR();

Object.freeze(instance);

export default instance;
