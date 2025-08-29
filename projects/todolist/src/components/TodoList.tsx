import Card from './Card';

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

export default function TodoList({
  todo,
  setTodo,
}: {
  todo: ITodo[];
  setTodo: (todos: ITodo[]) => void;
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

  return (
    <div className="w-full max-w-2xl mx-auto mt-3">
      {todo.map(item => (
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
