import { useState } from 'react';
import { useTodos } from '../../context/TodoContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useTodos();

  const [isDone, setIsDone] = useState(false);

  const handleIsDone = e => {
    console.log('e.target.checked: ', e.target.checked);
    setIsDone(e.target.checked);
  };

  const getFilteredTodos = () => {
    if (isDone) {
      return todos.filter(item => item.done);
    }
    return todos;
  };

  const getStatsCount = () => {
    const totalCount = todos.length;
    const doneCount = todos.filter(item => item.done).length;

    return { totalCount, doneCount };
  };

  const { totalCount, doneCount } = getStatsCount();

  return (
    <>
      <div>
        {'' + isDone}
        <input type='checkbox' id='isDone' checked={isDone} onChange={handleIsDone} />
        <label htmlFor='isDone'>
          완료된 항목 보기 = {doneCount} / {totalCount}
        </label>
      </div>
      <ul>
        {getFilteredTodos().map(item => (
          <li key={item.id}>
            <TodoItem item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
