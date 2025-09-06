import { MdDelete } from 'react-icons/md';
import type { Todo } from '../TodoList/TodoList';
import { todoStore } from '../../store/todoStore';
import { useRef } from 'react';

interface ITodo {
  todo: Todo;
}

export default function Todo({ todo }: ITodo) {
  const { updateTodo, deleteTodo } = todoStore();

  const handleToggle = () => {
    const newStatus = todo.status === 'completed' ? 'active' : 'completed';
    updateTodo(todo.id, todo.todo, newStatus);
  };

  return (
    <li>
      <input
        type="checkbox"
        id="checkbox"
        checked={todo.status === 'completed'}
        onChange={handleToggle}
      />
      <label htmlFor="checkbox">{todo.todo}</label>
      <button onClick={() => deleteTodo(todo.id)}>
        <MdDelete />
      </button>
    </li>
  );
}
