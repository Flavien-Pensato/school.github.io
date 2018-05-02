import Loadable from 'react-loadable';

import { Loader } from './loader.page';

export const LoadableHomePage = Loadable({
  loader: () => import('./home.page'),
  loading: Loader,
});
