import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    pushTodo: (state, action) => {
      state.todos = action.payload;
    },
    /* addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      if (index) {
        state.todos[index] === action.payload;
      } else return state.todos[index];
    },
    deleteTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.uuid === action.payload.uuid
      );
      if (index) {
        state.todos.splice(index, 1);
      } else return state.todos;
    }, */
  },
});

export const { /* addTodo, updateTodo, deleteTodo */ pushTodo } =
  TodoSlice.actions;

export default TodoSlice.reducer;
