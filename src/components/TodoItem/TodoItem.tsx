import React from "react";

import { Todo } from "../TodoListContainer/TodoListContainer";

interface TodoItemProps {
  todo: Todo;
  onChangeIsDone: (id: Todo["id"]) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onChangeIsDone }) => {
  const handleChangeIsDone = () => onChangeIsDone(todo.id);

  return (
    <li key={todo.id}>
      <h4>{todo.title}</h4>
      <p>{todo.date}</p>
      <p>{todo.description}</p>
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={handleChangeIsDone}
      />
    </li>
  );
};

export default TodoItem;