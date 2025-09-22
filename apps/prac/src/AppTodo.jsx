import { useState } from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';

function AppTodo() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([
    { id: 0, text: 'HTML&CSS 공부하기' },
    { id: 1, text: '자바스크립트 공부하기' },
  ]);

  const handleAddTodo = () => {
    const nextId = todos.length + Math.floor(Math.random() * 10000);
    setTodos([...todos, { id: nextId, text: todoText }]);
  };

  const handleChangeTodoText = e => {
    setTodoText(e.target.value);
  };

  return (
    <div>
      <h2>할일목록</h2>
      <input type='text' placeholder='할일을 입력하세요.' onChange={handleChangeTodoText} />
      <button onClick={handleAddTodo}>추가</button>
      <div>Preview: {todoText}</div>
      <TodoList todos={todos} />
    </div>
  );
}

export default AppTodo;
