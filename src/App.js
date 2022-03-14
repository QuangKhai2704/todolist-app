import TodoList from "./components/TodoList";
import AddTodos from "./components/AddTodos";
import React from "react";
import FilterTodo from "./components/FilterTodo";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import NotCompleted from "./components/NotCompleted";


/*function App() {
  const [todos, setTodos] = useState([]);
  const [todoFilter, setTodoFilter] = useState([]);
  const [trigger, setTrigger] = useState(false);
  return <div>App</div>;
}*/

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
  render() {
    return (
      <Router>
        <AddTodos addTodoFn={this.addTodo}></AddTodos>
       <div className="wrap">
        <label htmlFor="todo">Chọn bộ lọc</label>
          <ul>
            <li id="All">
              <Link to="/">Tất cả</Link>
            </li>
            <li id="completed">
              <Link to="/active">Đã hoàn thành</Link>
            </li>
            <li id="notCompleted">
              <Link to="/inactive">Chưa hoàn thành</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <TodoList
                updateTodoFn={this.updateTodo}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                selects={this.selects}
                handleTick={this.handleTick}
                handleDeleteAll={this.handleDeleteAll}
                trigger={this.state.trigger}
                todos={this.state.todos}
              />
            }
          ></Route>
          <Route
            path="/active"
            element={
              <FilterTodo
                todoFilter={this.state.todos}
                updateTodoFn={this.updateTodo}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                selects={this.selects}
                handleTick={this.handleTick}
                handleDeleteAll={this.handleDeleteAll}
                trigger={this.state.trigger}
              />
            }
          ></Route>
          <Route
            path="/inactive"
            element={
              <NotCompleted
                todoFilter={this.state.todos}
                updateTodoFn={this.updateTodo}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                selects={this.selects}
                handleTick={this.handleTick}
                handleDeleteAll={this.handleDeleteAll}
                trigger={this.state.trigger}
              />
            }
          ></Route>
        </Routes>
      </Router>
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
