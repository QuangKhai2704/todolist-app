/* import React from "react";

class AddTodos extends React.Component {

    constructor(){
        super();
        this.state = {
            todo:''
        };
    }
    render() {
        return(
        <div className='addTodosContainer'>
             <h1 style={{width: "100%", textAlign: 'center'}}>Todos </h1>
             <div style={{display: 'flex'}}>
                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                 </div>
                 <div style={{flex: 1}}>
                    <form onSubmit={(e) => this.submitTodo(e)}>
                        <input id='addTodoInput' onChange={(e) => this.updateInput(e)} type='text'></input>
                    </form>
                 </div>
             </div>
         </div>
        );
    }
    updateInput = (e) => {
        this.setState({todo: e.target.value});
    }
    submitTodo = (e) => {
        e.preventDefault();
        this.props.addTodoFn(this.state.todo);
        document.getElementById('addTodoInput').value=''; 
    }
}

export default AddTodos; 

 */


import React, { useState, useEffect, useRef } from 'react';

function AddTodos(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default AddTodos;