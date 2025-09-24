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
    if (!todoText) alert('할일을 입력하세요.');

    const nextId = todos.length + Math.floor(Math.random() * 10000);
    setTodos([...todos, { id: nextId, text: todoText }]);

    setTodoText('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleChangeTodoText = e => {
    setTodoText(e.target.value);
  };

  const handleDeleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h2>할일목록</h2>
      <input
        type='text'
        placeholder='할일을 입력하세요.'
        value={todoText}
        onChange={handleChangeTodoText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTodo}>추가</button>
      <div>Preview: {todoText}</div>
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
}

export default AppTodo;
