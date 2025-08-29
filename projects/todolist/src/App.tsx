import { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import Tab, { type TabType } from './components/Tab';
import TodoList, { type ITodo } from './components/TodoList';

function App() {
  /** session에서 할 일 목록 있으면 가져오기 */
  useEffect(() => {
    const todo = sessionStorage.getItem('todo');
    if (todo) {
      setTodo(JSON.parse(todo));
    }
  }, []);

  const [todo, setTodo] = useState<ITodo[]>([]); // 할 일 목록
  const [tab, setTab] = useState<TabType>('All'); // 탭 상태

  return (
    <div className="flex flex-col justify-center items-center">
      <Tab tab={tab} setTab={setTab} />
      <TodoList todo={todo} setTodo={setTodo} tab={tab} />
      <AddTodo todo={todo} setTodo={setTodo} />
    </div>
  );
}

export default App;
