import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { todoStore } from '../store/todoStore';

export default function AddTodo() {
  const { addTodo } = todoStore();
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('제출 시작');
    if (text.trim().length === 0) {
      alert('Please enter a todo');
      return;
    }

    addTodo({ id: uuidv4(), todo: text, status: 'active' });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Add todo" value={text} onChange={handleChange} />
      <button className="">Add</button>
    </form>
  );
}
