import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IAddTodo {
  onAdd: (todo: { id: string; todo: string; status: string }) => void;
}

export default function AddTodo({ onAdd }: IAddTodo) {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim().length === 0) {
      alert('Please enter a todo');
      return;
    }

    onAdd({ id: uuidv4(), todo: text, status: 'active' });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add todo" value={text} onChange={handleChange} />
      <button className="">Add</button>
    </form>
  );
}
