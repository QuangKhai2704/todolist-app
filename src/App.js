import TodoList from "./components/TodoList";
import AddTodos from "./components/AddTodos";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as action from "./features/TodoSlice";
import { connect } from "react-redux";

const filterItem = (items = [], status = "") => {
  switch (status) {
    case "all":
      return items;
    case "active":
      return items.filter((todo) => !todo.completed);
    case "complete":
      return items.filter((todo) => todo.completed);
    default:
      return items;
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoFilter: [],
      trigger: false,
      todoToShow: "all",
    };
    this.filterTodoCompleted = this.filterTodoCompleted.bind(this);
    this.filterClear = this.filterClear.bind(this);
    this.filterTodoNotCompleted = this.filterTodoNotCompleted.bind(this);
    //this.handleUpdate = this.handleUpdate(this);
  }
  componentDidMount() {
    this.todos = this.props.todo;
  }
  handleTick = async (kaka) => {
    const uuid = uuidv4();
    const newApp = this.state.todos.map((todo) => {
      if (todo === kaka)
        return {
          text: todo.text,
          completed: !todo.completed,
          uuid: uuid,
        };
      else return todo;
    });
    await this.setState({ todos: newApp });
    console.log(newApp);
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
        return { completed: _todo.completed, text: todo, uuid: uuid };
      else return _todo;
    });
    await this.setState({ todos: newFix });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };
  handleDelete = async (hahaha) => {
    const newFix = this.state.todos.filter((todo) => todo !== hahaha);

    await this.setState({ todos: newFix });
    this.props.action.pushTodo(this.state.todos);
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
    console.log(this.state.todoFilter);
  };
  filterTodoNotCompleted = async () => {
    const todoNotCompleted = this.state.todos.map((todo) => {
      if (todo.completed === false) return todo;
      else return "";
    });
    await this.setState({ todoFilter: todoNotCompleted });
    console.log(this.state.todoFilter);
  };

  updateTodoToShow = (s) => {
    this.setState({
      todoToShow: s,
    });
  };

  render() {
    let todos = filterItem(this.state.todos, this.state.todoToShow);

    return (
      <div>
        <AddTodos addTodoFn={this.addTodo}></AddTodos>
        <TodoList
          updateTodoFn={this.updateTodo}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          selects={this.selects}
          handleTick={this.handleTick}
          handleDeleteAll={this.handleDeleteAll}
          trigger={this.state.trigger}
          todos={todos}
        />

        <div className="wrap">
          <div>
            Todos left:{" "}
            {this.state.todos.filter((todo) => !todo.completed).length}
          </div>
          <div>
            <button onClick={() => this.updateTodoToShow("all")}>All</button>
            <button onClick={() => this.updateTodoToShow("active")}>
              Active
            </button>
            <button onClick={() => this.updateTodoToShow("complete")}>
              Completed
            </button>
            {this.state.todos.some((todo) => todo.complete) ? (
              <button onClick={this.removeAllTodosThatAreComplete}>
                {" "}
                Remove all
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  addTodo = async (todo) => {
    const uuid = uuidv4();
    await this.setState({
      todos: [
        ...this.state.todos,
        {
          text: todo,
          completed: false,
          uuid: uuid,
        },
      ],
    });
    this.props.action.pushTodo(this.state.todos);
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
    this.props.action.pushTodo(this.state.todos);
  };
}
const mapStateToProps = (state) => ({
  todo: state.todo.todos,
});

export default connect(mapStateToProps)(App);
