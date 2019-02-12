import React, { Component } from 'react';
import uniqid from 'uniqid';
import Todo from './components/Todo/Todo';
import './App.css'

const classNames = {
  TODO_ITEM: 'todo-container',
}

class App extends Component {
  state = {
    todos: [],
    todosTotal: 0,
    todosUnchecked: 0,
  };

  newTodo = () => {
    const { todos } = this.state;
    const todo = {
      id: uniqid(),
      task: 'The thing to do',
      completed: false,
    };
    todos.push(todo);
    this.saveChanges(todos);
  };

  toggleTodo = id => {
    const { todos } = this.state;
    const toggled = todos.find(todo => todo.id === id);
    toggled.completed = !toggled.completed;
    this.saveChanges(todos);
  };

  deleteTodo = id => {
    const todos = this.state.todos.filter(todo => todo.id !== id);
    this.saveChanges(todos);
  };

  updateCounts = todos => {
    const todosTotal = todos.length;
    const todosUnchecked = todos.reduce((tally, todo) => {
      if (!todo.completed) tally++;
      return tally;
    }, 0);

    return [todosTotal, todosUnchecked];
  };

  saveChanges = todos => {
    const [todosTotal, todosUnchecked] = this.updateCounts(todos);
    this.setState({ todos, todosTotal, todosUnchecked });
  };

  render() {
    return (
      <div className="container center">
        <h1 className="center title">My TODO App</h1>
        <div className="flow-right controls">
          <span>
            Item count: <span id="item-count">{this.state.todosTotal}</span>
          </span>
          <span>
            Unchecked count:{' '}
            <span id="unchecked-count">{this.state.todosUnchecked}</span>
          </span>
        </div>
        <button className="button center" onClick={this.newTodo}>
          New TODO
        </button>
        <ul id="todo-list" className="todo-list">
          {this.state.todos.map(todo => (
            <li className={classNames.TODO_ITEM} key={todo.id}>
              <Todo
                details={todo}
                toggleTodo={this.toggleTodo}
                deleteTodo={this.deleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
