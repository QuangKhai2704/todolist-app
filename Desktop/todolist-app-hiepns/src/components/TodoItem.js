/* import React from "react";
import "./style.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.disable = this.state.disabled;
    this.inputRef = null;
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.wrapperRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFocus() {
    this.setState({ disabled: !this.disable });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ disabled: true });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ disabled: true });
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
    const { todo } = this.props;
    return (
      <form onSubmit={this.handleSubmit} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="checkbox-wrapper">
          <input
            id={`${todo.uuid}`}
            type="checkbox"
            checked={
              todo === null ? "" : todo.completed === true ? true : false
            }
            onChange={this.handleTick}
          />
          <label htmlFor={`${todo.uuid}`}></label>
        </div>
        <div onClick={this.toggleTodo} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <input
            type="text"
            className={
              "todoItem" +
              (todo === null ? "" : todo.completed ? "completed" : "")
            }
            value={todo === null ? "" : this.props.todo.text}
            onChange={this.handleUpdate}
            ref={this.wrapperRef}
            disabled={this.state.disabled}
          />  
          <div className="deletebutton">
            <input type="button" onClick={this.handleDelete} value="X" />
          </div> 
        </div>
      </form>
    );
  }
  toggleTodo = () => {
    this.handleFocus();
  };
  handleUpdate = (e) => {
    this.props.handleUpdate(e.target.value, this.props.todo);
  };
  handleDelete = () => {
    this.props.handleDelete(this.props.todo);
  };
  handleTick = () => {
    this.props.handleTick(this.props.todo);
  };
}

export default TodoItem;
 */

import React, { useState } from 'react';
import AddTodos from './AddTodos';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <AddTodos edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;