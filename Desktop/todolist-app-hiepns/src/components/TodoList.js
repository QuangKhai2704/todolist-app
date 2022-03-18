/* import React from "react";
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
         
          <input
          type="checkbox"
          id="xyz"
          onChange={this.selects}
          checked={this.props.trigger ? true : false}
          />
          <label htmlFor="xyz"></label>
        
        
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
 */



import React, { useEffect, useState } from "react";
import AddTodos from "./AddTodos";
import TodoItem from "./TodoItem";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem("key"));
    const data = JSON.parse(localStorage.getItem("key"));
    if (data !== null) {
      setTodos(data);
    }
  }, []);
  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    await setTodos(newTodos);
    localStorage.setItem("key", JSON.stringify(newTodos));
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    const updateArr = todos.map((todo) =>
      todo.id === todoId ? newValue : todo
    );
    await setTodos(updateArr);
    localStorage.setItem("key", JSON.stringify(updateArr));
    console.log(updateArr);
  };

  const removeTodo = async (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    await setTodos(removedArr);
    localStorage.setItem("key", JSON.stringify(removedArr));
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Kế hoạch hôm nay?</h1>
      <AddTodos onSubmit={addTodo} />
      <TodoItem
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;