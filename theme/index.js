import themePreset from '@rebass/preset';
import deepmerge from 'deepmerge';

export default deepmerge(themePreset, {
  text: {
    error: {
      color: 'red',
    },
  },
});
