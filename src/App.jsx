import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addToList() {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random(),
        title: inputValue,
        done: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <>
      <div className="bg-pink-400 max-w-max p-10">
        <input
          className="rounded-md p-1 "
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What do you want to do?"
        />
        <button
          className="bg-pink-900 text-slate-100 rounded-md p-1 m-2"
          onClick={addToList}
        >
          Add to list
        </button>
        <ul>
          {todos.map((todo) => (
            <div key={todo.id} className=" flex items-center justify-start">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo.id)}
              />
              <span className="text-slate-900 font-bold mx-2">
                {todo.title}
              </span>{" "}
              <button onClick={() => handleDelete(todo.id)}>
                <MdDeleteOutline className=" text-pink-800" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
