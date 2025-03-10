import { useState } from 'react';

function StreamList() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    console.log('User Input:', input);
    setList([...list, input]);
    setInput('');
  };

  return (
    <div className="container">
      <h1>Welcome to StreamList</h1>
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
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;