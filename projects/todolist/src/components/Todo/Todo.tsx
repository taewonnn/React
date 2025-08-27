import { MdDelete } from 'react-icons/md';
import type { Todo } from '../TodoList/TodoList';

interface ITodo {
  todo: Todo;
  onUpdate: (id: string, todo: string, status: string) => void;
  onDelete: (id: string) => void;
}

export default function Todo({ todo, onUpdate, onDelete }: ITodo) {
  const handleToggle = () => {
    const newStatus = todo.status === 'completed' ? 'active' : 'completed';
    onUpdate(todo.id, todo.todo, newStatus);
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
      <button onClick={() => onDelete(todo.id)}>
        <MdDelete />
      </button>
    </li>
  );
}
