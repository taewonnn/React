import Card from './Card';
import type { ITodo } from '../App';
import { useEffect } from 'react';

export default function TodoList({
  todo,
  setTodo,
}: {
  todo: ITodo[];
  setTodo: (todos: ITodo[]) => void;
}) {
  /** 세션과 동기화 */
  useEffect(() => {
    if (todo.length > 0) {
      sessionStorage.setItem('todo', JSON.stringify(todo));
    }
  }, [todo]);

  /** 삭제 함수 */
  const handleDelte = (id: string) => {
    setTodo(todo.filter(item => item.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-3">
      {todo.map(item => (
        <Card
          key={item.id}
          text={item.text}
          isDone={item.isDone}
          id={item.id}
          handleDelte={handleDelte}
        />
      ))}
    </div>
  );
}
