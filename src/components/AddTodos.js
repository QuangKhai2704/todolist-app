import React from "react";

class AddTodos extends React.Component {

    constructor(){
        super();
        this.state = {
            todo:''
        };
    }
    render() {
        return(
        <div
    
        className='addTodosContainer'>
            <form onSubmit={(e) => this.submitTodo(e)}>
                <h1>Kế hoạch hôm nay ? </h1>
                <input id='addTodoInput' onChange={(e) => this.updateInput(e)} type='text'></input>
            </form>
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