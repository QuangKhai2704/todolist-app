/* import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import TodoItem from "./TodoItem";

export default class FilterTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: true, completed: true };
    this.todosRef = [];
    this.selects = this.selects.bind(this);
    //this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDeleteAll = this.handleDeleteAll.bind(this);
  }
  selects() {
    this.props.selects();
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
  render() {
    const { todoFilter } = this.props;
    return (
      <div className="todoListContainer">
        <div className="checkbox-wrapper">
        <input
          type="checkbox"
          id="abc"
          onChange={this.selects}
          checked={this.props.trigger ? true : false}
        /><label htmlFor="abc"></label></div>
        {todoFilter.map((_todoFilter, _index) =>
          _todoFilter === "" ? (
            <Fragment key={_index} />
          ) : _todoFilter.completed === true ? (
            <div key={_index}>
              <label htmlFor={_index}></label>
              <TodoItem
                updateTodoFn={this.updateTodo}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                handleTick={this.handleTick}
                key={_index}
                todo={_todoFilter}
              ></TodoItem>
            </div>
          ) : (
            <Fragment key={_index} />
          )
        )}
      </div>
    );
  }
}
 */