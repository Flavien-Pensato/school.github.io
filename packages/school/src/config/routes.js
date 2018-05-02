import { LoadableHomePage } from '../views/pages/home.loadable';
import { LoginPage } from '../views//pages/login.page';
import { Students } from '../views/pages/students.page';
import { Calendar } from '../views//pages/calendar.page';
import { Tasks } from '../views/pages/tasks.page';
import Preview from '../modules/school/components/preview.connector';

export const Routes = [{
  name: 'home',
  path: '/',
  exact: true,
  component: LoadableHomePage,
}, {
  name: 'login',
  path: '/login',
  component: LoginPage,
}, {
  name: 'students',
  path: '/eleves/:id?',
  component: Students,
}, {
  name: 'preview',
  path: '/preview',
  component: Preview,
}, {
  name: 'calendar',
  path: '/calendrier',
  component: Calendar,
}, {
  name: 'tasks',
  path: '/taches',
  component: Tasks,
}];
