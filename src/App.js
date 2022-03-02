import TodoList from "./components/TodoList";
import AddTodos from "./components/AddTodos";
import React from "react";
import FilterTodo from "./components/FilterTodo";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoFilter: [],
      trigger: false,
    };
    this.filterTodoCompleted = this.filterTodoCompleted.bind(this);
    this.filterClear = this.filterClear.bind(this);
    this.filterTodoNotCompleted = this.filterTodoNotCompleted.bind(this);
    //this.handleUpdate = this.handleUpdate(this);
  }
  handleTick = async (kaka) => {
    const uuid = uuidv4();
    const newApp = this.state.todos.map((todo) => {
      if (todo === kaka)
        return {
          text: todo.text,
          completed: todo.completed === true ? false : true,
          uuid: uuid,
        };
      else return todo;
    });
    await this.setState({ todos: newApp });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  selects = async () => {
    const uuid = uuidv4();
    const newApp = this.state.todos.map((todo) => {
      if (this.state.trigger === false)
        return { text: todo.text, completed: true, uuid: uuid };
      else if (this.state.trigger === true)
        return { text: todo.text, completed: false, uuid: uuid };
      else return todo;
    });
    this.setState({ trigger: !this.state.trigger });
    await this.setState({ todos: newApp });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  handleUpdate = async (todo, tada) => {
    const uuid = uuidv4();
    const newFix = this.state.todos.map((_todo) => {
      if (_todo.uuid === tada.uuid)
        return { completed: false, text: todo, uuid: uuid };
      else return _todo;
    });
    await this.setState({ todos: newFix });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  handleDelete = async (hahaha) => {
    const index = this.state.todos.indexOf(hahaha);
    const newFix = this.state.todos.splice(index, 1);

    await this.setState({ todos: newFix });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  handleDeleteAll = async () => {
    const newFix = this.state.todos.filter((todo) => todo.completed === false);
    await this.setState({ todos: newFix });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  filterClear = () => {
    this.setState({ todoFilter: [] });
  };
  filterTodoCompleted = async () => {
    const todoCompleted = this.state.todos.map((todo) => {
      if (todo.completed === true) return todo;
      else return "";
    });
    await this.setState({ todoFilter: todoCompleted });

  };
  filterTodoNotCompleted = async () => {
    const todoNotCompleted = this.state.todos.map((todo) => {
      if (todo.completed === false) return todo;
      else return "";
    });
    await this.setState({ todoFilter: todoNotCompleted });
  };
  render() {
    return (
      <div>
        <AddTodos addTodoFn={this.addTodo}></AddTodos>
        {this.state.todoFilter.length === 0 ? (
          <div>
            <TodoList
              updateTodoFn={this.updateTodo}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              selects={this.selects}
              handleTick={this.handleTick}
              handleDeleteAll={this.handleDeleteAll}
              trigger={this.state.trigger}
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
        <div className="wrap">
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
    const uuid = uuidv4();
    await this.setState({
      todos: [
        ...this.state.todos,
        {
          text: todo,
          completed: completed,
          uuid: uuid,
        },
      ],
    });
    localStorage.setItem("todo", JSON.stringify(this.state.todos));
  };
  updateTodo = async (todo) => {
    const uuid = uuidv4();
    const newTodos = this.state.todos.map((_todo) => {
      if (todo === _todo)
        return {
          completed: true,
          text: todo.text,
          uuid: uuid,
        };
      else return _todo;
    });
    await this.setState({ todos: newTodos });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
}

export default App;
