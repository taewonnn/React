import { memo } from 'react';
import { useTodoDispatch } from '../../context/TodoContext';

/**
 * memo를 사용하지 않을 때는 할일 목록 중 하나 선택해서 완료상태 변경해도 나머지 모든 할일 목록을 렌더링 해버림
 * memo를 사용하면 할일 목록 중 하나 선택해서 완료상태 변경해도 나머지 모든 할일 목록을 렌더링 하지 않음(변경되는 할일목록에 대한것만 리렌더링)
 */
export default memo(function TodoItem({ item }) {
  console.log('TodoItem 렌더링');
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
});
