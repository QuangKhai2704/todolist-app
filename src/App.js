import TodoList from './components/TodoList';
import AddTodos from './components/AddTodos';
import React from 'react';


 class App extends React.Component {
   constructor() {
     super();
     this.state = {
       todos: []
     };
   }

   render() {
     return(
      <div>
        <AddTodos addTodoFn={this.addTodo}></AddTodos>
        <TodoList updateTodoFn={this.updateTodo} todos={this.state.todos}></TodoList>
      </div>
     
     );
   }

   componentDidMount = () => {
     const todos = localStorage.getItem('todos')
     if(todos) {
       const savedTodos = JSON.parse(todos);
       this.setState({ todos: savedTodos });
     } else {
       console.log('No todos'); 
     }
   }
   addTodo= async (todo) => {
    await this.setState({ todos: [...this.state.todos, {
      text:todo,
      completed:false
    }
    ]});
    localStorage.setItem('todo', JSON.stringify(this.state.todos))
    console.log(localStorage.getItem('todos'));
   } 
  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo)
      return {
        text: todo.text,
        completed: !todo.completed
      }
      else
      return _todo
    });
    await this.setState({todos: newTodos});
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

}

export default App;
