import TodoList from "./components/TodoList";
import AddTodos from "./components/AddTodos";
import React from "react";
import FilterTodo from "./components/FilterTodo";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoFilter: [],
    };
    this.filterTodoCompleted = this.filterTodoCompleted.bind(this);
    this.filterClear = this.filterClear.bind(this);
    this.filterTodoNotCompleted = this.filterTodoNotCompleted.bind(this);
  }
  filterClear = () => {
    this.setState({ todoFilter: [] });
  };
  filterTodoCompleted = async () => {
    const todoCompleted = this.state.todos.map((todo) => {
      if (todo.completed === true) return todo;
      else return "";
    });
    await this.setState({ todoFilter: todoCompleted });
    console.log(this.state.todoFilter);
  };
  filterTodoNotCompleted = async () => {
    const todoNotCompleted = this.state.todos.map((todo) => {
      if (todo.completed === false) return todo;
      else return "";
    });
    await this.setState({ todoFilter: todoNotCompleted });
  };
  render() {
    console.log(this.state.todos);
    return (
      <div>
        <AddTodos addTodoFn={this.addTodo}></AddTodos>
        {this.state.todoFilter.length === 0 ? (
          <div>
            <TodoList
              updateTodoFn={this.updateTodo}
              todos={this.state.todos}
            ></TodoList>
          </div>
        ) : (
          <div>
            <FilterTodo todoFilter={this.state.todoFilter} />
          </div>
        )}
        <label htmlFor="todo">Chọn bộ lọc</label>
        <br />
        <div value="All" onClick={this.filterClear}>
          Tất cả
        </div>
        <div value="completed" onClick={this.filterTodoCompleted}>
          Đã hoàn thành
        </div>
        <div value="notCompleted" onClick={this.filterTodoNotCompleted}>
          Chưa hoàn thành
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState({ todos: savedTodos });
    } else {
      console.log("No todos");
    }
  };
  addTodo = async (todo, completed) => {
    await this.setState({
      todos: [
        ...this.state.todos,
        {
          text: todo,
          completed: completed,
        },
      ],
    });
    localStorage.setItem("todo", JSON.stringify(this.state.todos));
  };
  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map((_todo) => {
      if (todo === _todo)
        return {
          completed: true,
          text: todo.text,
        };
      else return _todo;
    });

    await this.setState({ todos: newTodos });
    console.log(newTodos);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
}

export default App;