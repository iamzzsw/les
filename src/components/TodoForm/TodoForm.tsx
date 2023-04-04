import React from "react";

import { Todo } from "../TodoListContainer/TodoListContainer";

interface TodoFormProps {
  formClassName: string;
  onCreate: (todo: Todo) => void;
}

interface TodoFormState {
  title: string;
  description: string;
}

class TodoForm extends React.Component<TodoFormProps, TodoFormState> {
  state = {
    title: "",
    description: "",
  };

  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      title: this.state.title,
      description: this.state.description,
      id: Math.random(),
      isDone: false,
      date: new Date().toLocaleDateString(),
    };

    this.props.onCreate(newTodo);

    this.setState({
      title: "",
      description: "",
    });
  };

  handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    const { title, description } = this.state;
    const { formClassName } = this.props;

    return (
      <form
        className={formClassName}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
      >
        <p>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChangeTitle}
          />
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChangeDescription}
          ></textarea>
        </p>
        <p>
          <button
            type="submit"
            disabled={title.length < 5 || description.length < 10}
          >
            Create
          </button>
          <button type="reset">Reset</button>
        </p>
      </form>
    );
  }
}

export default TodoForm;