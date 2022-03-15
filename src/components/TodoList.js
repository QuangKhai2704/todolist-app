import React from "react";
import TodoItem from "../components/TodoItem";

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
    const { todos } = this.props;
    return (
        // {/* <input type="checkbox" onChange={this.selects} checked={this.props.trigger?true:false} /> */}
        <section className="main">
        <ul className="todo-list">
          {todos.map((_todo, _index) => {
            return (
              // <div key={_index}>
              //   {/* <label htmlFor={_index}></label> */}
                
              // </div>
              <TodoItem
              updateTodoFn={this.updateTodo}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              handleTick={this.handleTick}
              key={_index}
              todo={_todo}
            ></TodoItem>
            );
          })}
        </ul>
        </section>
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
