import React from "react";
import './style.css'; 

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.todo.text, disabled: true };
        this.disable = this.state.disabled;
        this.inputRef = null;
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.wrapperRef = React.createRef();
      }
      handleFocus() {
        this.setState({ disabled: !this.disable });
      }
    handleChange(event) {
        this.setState({ value: event.target.value });
      }
      
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          this.setState({ disabled: true });
        }}
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    render() {
        const {todo} = this.props;
        return(
        <label onClick={this.toggleTodo}>Click vào để sửa<input type="text"
            className={'todoItem' + (todo.completed ? 'completed':'' )}
             value={this.state.value} onChange={this.handleChange}  ref={this.wrapperRef} disabled={this.state.disabled}/></label>
        );
    }
    toggleTodo = () => {
        this.props.updateTodoFn(this.props.todo);
        this.handleFocus()
    }
}

export default TodoItem;