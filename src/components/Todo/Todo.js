import React from 'react';
import PropTypes from 'prop-types';

const classNames = {
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const Todo = props => {
  const { id, task, completed } = props.details;
  return (
    <div id={id}>
      <input
        className={classNames.TODO_CHECKBOX}
        type="checkbox"
        value={completed}
        onChange={() => props.toggleTodo(id)}
      />
      <p className={classNames.TODO_TEXT}>{task}</p>
      <button
        className={classNames.TODO_DELETE}
        onClick={() => props.deleteTodo(id)}
      >
        Delete
      </button>
    </div>
  );
};

const { shape, string, bool, func } = PropTypes;

Todo.propTypes = {
  details: shape({
    id: string,
    task: string,
    completed: bool,
  }),
  toggleTodo: func,
  deleteTodo: func,
};

export default Todo;
