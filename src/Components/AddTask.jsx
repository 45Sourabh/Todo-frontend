import { useEffect, useState } from "react";
import TodoList from "./TodoList";

function AddTask() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isBtn, setIsBtn] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function fetchingData() {
      let res = await fetch("https://todo-backend-4i3z.onrender.com/");
      let data = await res.json();
      setTodos(data);
    }
    fetchingData();
  }, []);

  async function handleAdd() {
    if (input.trim() === "") return;

    try {
      const res = await fetch("https://todo-backend-4i3z.onrender.com/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setTodos([...todos, data]);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate() {
    if (input.trim() === "") return alert("Please Enter Input");

    const res = await fetch(`https://todo-backend-4i3z.onrender.com/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();

    const updatedTodos = todos.map((todo) =>
      todo._id === editingId ? data : todo
    );
    setTodos(updatedTodos);
    setIsBtn(false);
    setInput("");
    setEditingId(null);
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-700 drop-shadow">Todo App</h1>

      <div className="flex gap-4 mb-6 w-full max-w-md">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          type="text"
          placeholder="Enter Task"
        />
        {isBtn ? (
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-transform duration-300 hover:scale-105"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
          >
            Add
          </button>
        )}
      </div>

      <TodoList
        data={todos}
        setTodo={setTodos}
        input={setInput}
        editingId={setEditingId}
        editData={setIsBtn}
      />
    </div>
  );
}

export default AddTask;
