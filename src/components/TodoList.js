import React from "react";
import TodoItem from "../components/TodoItem";
import { v4 as uuidv4 } from "uuid";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.todosRef = [];
    this.selects = this.selects.bind(this);
    //this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
  }
  selects() {
    this.props.selects();
  }

  render() {
    const uuid = uuidv4();
    const { todos } = this.props;
    return (
      <div className="todoListContainer">

        {/* <div className="checkbox-wrapper">
          <input
          type="checkbox"
          id="xyz"
          onChange={this.selects}
          checked={this.props.trigger ? true : false}
          />
          <label htmlFor="xyz"></label>
        </div> */}
        
        {todos.map((_todo, _index) => {
          return (
            <div key={_index}>
              <TodoItem
                updateTodoFn={this.updateTodo}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleTick={this.handleTick}
                id={uuid}
                key={_index}
                todo={_todo}
              ></TodoItem>
            </div>
          );
        })}
      </div>
    );
  }
  updateTodo = (todo) => {
    this.props.updateTodoFn(todo);
  };
  handleUpdate = (todo, tada) => {
    this.props.handleUpdate(todo, tada);
  };
  handleDelete = (hahaha) => {
    this.props.handleDelete(hahaha);
  };
  handleTick = (kaka) => {
    this.props.handleTick(kaka);
  };
  handleDeleteAll = () => {
    this.props.handleDeleteAll();
  };
}

export default TodoList;
