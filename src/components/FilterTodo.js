import React, { Component } from "react";

export default class FilterTodo extends Component {
  render() {
    const { todoFilter } = this.props;
    return (
      <div>
        {todoFilter.map((todo, index) => (
          <div key={index}>{todo.text}</div>
        ))}
      </div>
    );
  }
}