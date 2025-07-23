function TodoList({ data, editData, input, editingId, setTodo }) {
  async function handleEdit(item) {
    editData(true);
    editingId(item._id);
    const res = await fetch(`http://localhost:5050/${item._id}`);
    const data = await res.json();
    input(data.input);
  }

  async function handleDelete(item) {
    try {
      const res = await fetch(`http://localhost:5050/${item._id}`, {
        method: "DELETE",
      });
      const deleteData = await res.json();
      const items = data.filter((todo) => todo._id !== deleteData._id);
      setTodo(items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ul className="w-full max-w-md space-y-4 animate-fadeIn">
      {data.map((item) => (
        <li
          key={item._id}
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
        >
          <span className="text-gray-800 font-medium">{item.input}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
