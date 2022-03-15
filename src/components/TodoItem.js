import React from "react";
import "./style.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
    this.disable = this.state.disabled;
    this.inputRef = null;
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.wrapperRef = React.createRef();
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTick = this.handleTick.bind(this);
  }
  handleFocus() {
    this.setState({ disabled: !this.disable });
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ disabled: true });
    }
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
render() {
    const { todo } = this.props;
    return (
      <li>
        <div style={{marginLeft: "4px"}}>
          <input
            type="checkbox"
            checked={todo === null ? "" : todo.completed === true ? true : false}
            onClick={this.handleTick}
          />
        </div>
        <div>
          <label onClick={this.toggleTodo}>
            {this.props.todo.text}
          </label>
          {/* <input
              type="text"
              className={
                "todoItem" +
                (todo === null ? "" : todo.completed ? "completed" : "")
              }
              value={todo === null ? "" : this.props.todo.text}
              onChange={this.handleUpdate}
              ref={this.wrapperRef}
              disabled={this.state.disabled}
            /> */}
        </div>
        <div style={{marginRight: "24px"}}>
          <div className="deletebutton">
            <input type="button" onClick={this.handleDelete} value="XÓA" />
          </div>
        </div>
      </li>
    );
  }
  toggleTodo = () => {
    this.props.updateTodoFn(this.props.todo);
    this.handleFocus();
  };
  handleUpdate = (e) => {
    this.props.handleUpdate(e.target.value, this.props.todo);
  };
  handleDelete = () => {
    this.props.handleDelete(this.props.todo);
  };
  handleTick = () => {
    this.props.handleTick(this.props.todo);
  };
}

export default TodoItem;