import React from "react";

import styles from "./TodoListContainer.module.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export interface Todo {
  id: number;
  title: string;
  description: string;
  date: string;
  isDone: boolean;
}

interface TodoListContainerProps {}

interface TodoListContainerState {
  list: Todo[];
  searchValue: string;
}

class TodoListContainer extends React.Component<
  TodoListContainerProps,
  TodoListContainerState
> {
  constructor(props: TodoListContainerProps) {
    super(props);

    this.state = {
      list: [],
      searchValue: "",
    };

    this.handleChangeIsDone = this.handleChangeIsDone.bind(this);
    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleChangeSearchValue = this.handleChangeSearchValue.bind(this);
  }

  handleChangeIsDone(id: Todo["id"]) {
    this.setState({
      list: this.state.list.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      ),
    });
  }

  handleCreateTodo(todo: Todo) {
    this.setState({ list: this.state.list.concat(todo) });
  }

  handleChangeSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    const { list, searchValue } = this.state;

    const filteredList =
      searchValue.length > 3
        ? list.filter((todo) =>
            todo.title
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )
        : list;

    return (
      <div className={styles.container}>
        <TodoForm
          formClassName={styles.form}
          onCreate={this.handleCreateTodo}
        />
        <section className={styles.todos}>
          <input
            type="text"
            value={searchValue}
            onChange={this.handleChangeSearchValue}
          />
          {filteredList.length === 0 ? (
            <h1>List is empty</h1>
          ) : (
            <ul>
              {filteredList.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChangeIsDone={this.handleChangeIsDone}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }
}

export default TodoListContainer;