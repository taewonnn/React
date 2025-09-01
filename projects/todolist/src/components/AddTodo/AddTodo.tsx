import { useState } from 'react';

interface IAddTodo {
  onAdd: (todo: { id: number; todo: string; status: string }) => void;
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

    onAdd({ id: Date.now(), todo: text, status: 'active' });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add todo" value={text} onChange={handleChange} />
      <button className="">Add</button>
    </form>
  );
}
