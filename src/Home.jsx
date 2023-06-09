import { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./App.css";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    if (inputValue === "") {
      return;
    }
    setTodos([...todos, { text: inputValue, done: false }]);
    setInputValue("");
  };

  const handleInputChange = (ev) => {
    setInputValue(ev.target.value);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      handleClick();
    }
  };

  const handleTodoDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleTodoEdit = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <div>
          {inputValue === "" ? (
            <Alert variant="danger">Please Type Something</Alert>
          ) : (
            <></>
          )}
        </div>

        <span className="textInput">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </span>

        <Button
          disabled={inputValue === ""}
          variant="secondary"
          size="sm"
          onClick={handleClick}
        >
          Add Todo
        </Button>

        <div>
          {todos.map((singleTodo, index) => {
            return (
              <div className="details" key={index}>
                <p
                  style={{
                    textDecoration: singleTodo.done ? "line-through" : "none",
                  }}
                  onClick={() => handleTodoDone(index)}
                >
                  {singleTodo.text}
                </p>

                <div>
                  <Button
                    className="delete"
                    variant="danger"
                    size="sm"
                    onClick={() => handleTodoDelete(index)}
                  >
                    Delete
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const newText = prompt(
                        "Enter new text:",
                        singleTodo.text
                      );
                      if (newText !== null) {
                        handleTodoEdit(index, newText);
                      }
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
