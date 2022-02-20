import React from "react";
import TodoItem from "../components/TodoItem";


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: true };
    this.todosRef = [];
    this.selects = this.selects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  selects() {
    this.todosRef.map(
      (item) => (item.checked = this.state.checked ? true : false)
    );
    this.isChecked = this.state.checked;
    this.setState({ checked: !this.isChecked });
  }

  render() {
    const { todos } = this.props;
    return (
      <div className="todoListContainer">
        <input type="checkbox" onClick={this.selects} />
        Select all
        {todos.map((_todo, _index) => {
          return (
            <div>
              <input
                type="checkbox"
                id={_index}
                ref={(ref) => (this.todosRef[_index] = ref)}
              />
              <label htmlFor={_index} onClick={this.handleClick(_todo)}>
                
              </label>
              <TodoItem
                updateTodoFn={this.updateTodo}
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
  handleClick = (_todo) => {
    _todo.completed = false;
  };
}

export default TodoList;
