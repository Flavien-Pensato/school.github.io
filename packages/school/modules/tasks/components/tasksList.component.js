import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  border-color: rgba(0, 0, 0, 0.2);
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const Button = styled.button`
  font-size: 0.875rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background-color: #a463f2;
  color: #fff;
  border-radius: 9999px;
  border-style: none;
  border-width: 0;
`;

class TaskItem extends Component {
  handleClickItem = event => {
    event.preventDefault();

    const { removeItem, task } = this.props;

    removeItem(task._id);
  };

  render() {
    const { task } = this.props;

    return (
      <Item>
        <span>{task.name}</span>
        <Button onClick={this.handleClickItem}>Supprimer</Button>
      </Item>
    );
  }
}

TaskItem.propTypes = {
  removeItem: PropTypes.func.isRequired,
  task: PropTypes.shape().isRequired,
};

export class TasksList extends Component {
  componentDidMount() {
    const { fetchTasks } = this.props;

    this.stopFetching = fetchTasks();
  }

  componentWillUnmount() {
    this.stopFetching();
  }

  render() {
    const { tasks, removeTask } = this.props;

    return (
      <div>
        <List>
          {tasks.map(task => (
            <TaskItem key={task.name} task={task} removeItem={removeTask} />
          ))}
        </List>
      </div>
    );
  }
}

TasksList.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
