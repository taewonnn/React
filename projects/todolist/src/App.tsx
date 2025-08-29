import { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import Tab from './components/Tab';
import TodoList from './components/TodoList';

export interface ITodo {
  id: string;
  text: string;
  isDone: boolean;
}

function App() {
  /** session에서 할 일 목록 있으면 가져오기 */
  useEffect(() => {
    const todo = sessionStorage.getItem('todo');
    if (todo) {
      setTodo(JSON.parse(todo));
    }
  }, []);

  const [todo, setTodo] = useState<ITodo[]>([]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Tab />
      <TodoList todo={todo} setTodo={setTodo} />
      <AddTodo todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
