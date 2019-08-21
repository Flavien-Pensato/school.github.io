import _ from 'lodash';

export const getTasks = ({ tasks }) => _.orderBy(_.get(tasks, 'tasks'), [task => task.name.toLowerCase()], ['asyn']);
