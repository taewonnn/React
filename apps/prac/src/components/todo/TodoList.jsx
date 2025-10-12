import { useMemo, useState } from 'react';
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

  /**
   * 리렌더링 발생하면 이 함수 계속 실행함!
   *  => useMemo 사용해서 성능 최적화 필요
   */
  // const getStatsCount = () => {
  //   console.log('getStatsCount 함수 실행!');
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter(item => item.done).length;

  //   return { totalCount, doneCount };
  // };

  /**
   * useMemo
   * todos 배열이 변경될 때만 함수 실행
   */
  const getStatsCount = useMemo(() => {
    console.log('getStatsCount 함수 실행!');
    const totalCount = todos.length;
    const doneCount = todos.filter(item => item.done).length;

    return { totalCount, doneCount };
  }, [todos]);

  const { totalCount, doneCount } = getStatsCount;

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
