import { useMemo } from 'react';
import Card from './Card';
import type { TabType } from './Tab';

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

export default function TodoList({
  todo,
  setTodo,
  tab,
}: {
  todo: ITodo[];
  setTodo: (todos: ITodo[]) => void;
  tab: TabType;
}) {
  /** 삭제 함수 */
  const handleDelte = (id: string) => {
    setTodo(todo.filter(item => item.id !== id));
    sessionStorage.setItem('todo', JSON.stringify(todo.filter(item => item.id !== id))); // 세션에서도 삭제
  };

  /** 상태 변경 함수 */
  const handleChangeStatus = (id: string) => {
    setTodo(
      todo.map(todoItem =>
        todoItem.id === id ? { ...todoItem, isDone: !todoItem.isDone } : todoItem,
      ),
    );
  };

  /** 필터된 할 일 목록 */

  const filteredTodo = useMemo(() => {
    return todo.filter(item => {
      if (tab === 'All') return true; // 모든 항목
      if (tab === 'Active') return !item.isDone; // 완료되지 않은 항목
      if (tab === 'Completed') return item.isDone; // 완료된 항목
      return true;
    });
  }, [todo, tab]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-3">
      {filteredTodo.map(item => (
        <Card
          key={item.id}
          text={item.text}
          isDone={item.isDone}
          id={item.id}
          handleDelte={handleDelte}
          handleChangeStatus={handleChangeStatus}
        />
      ))}
    </div>
  );
}
