import { useTodoDispatch } from '../../context/TodoContext';

export default function TodoItem({ item }) {
  const dispatch = useTodoDispatch();

  const handleToggleTodo = (id, done) => {
    dispatch({ type: 'done', id, done });
  };

  const handleDeleteTodo = id => {
    dispatch({ type: 'deleted', deleteId: id });
  };

  return (
    <label>
      <input type='checkbox' checked={item.done} onChange={e => handleToggleTodo(item.id, e.target.checked)} />
      <span>{item.done ? <del>{item.text}</del> : item.text}</span>
      <button onClick={() => handleDeleteTodo(item.id)}>X</button>
    </label>
  );
}
