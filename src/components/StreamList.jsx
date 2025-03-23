import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

function StreamList() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem("streamList");
    if (savedList) {
      setList(JSON.parse(savedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("streamList", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setList([...list, { text: input, completed: false, editing: false }]);
    setInput("");
  };

  const toggleComplete = (index) => {
    setList(list.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const enableEditing = (index) => {
    setList(list.map((item, i) => i === index ? { ...item, editing: true } : item));
  };

  const saveEdit = (index, newText) => {
    setList(list.map((item, i) =>
      i === index ? { ...item, text: newText, editing: false } : item
    ));
  };

  return (
    <div className="container">
      <h1>StreamList App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a movie or show..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((item, index) => (
          <li key={index} className={item.completed ? "completed" : ""}>
            {item.editing ? (
              <input
                type="text"
                defaultValue={item.text}
                onBlur={(e) => saveEdit(index, e.target.value)}
                autoFocus
              />
            ) : (
              <>
                <span>{item.text}</span>
                <button onClick={() => toggleComplete(index)}>
                  <FaCheck />
                </button>
                <button onClick={() => enableEditing(index)}>
                  <FaEdit />
                </button>
                <button onClick={() => deleteItem(index)}>
                  <FaTrash />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
