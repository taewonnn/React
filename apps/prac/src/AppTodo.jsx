import { useState } from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';

function AppTodo() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([
    { id: 0, text: 'HTML&CSS 공부하기', done: true },
    { id: 1, text: '자바스크립트 공부하기', done: false },
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

  const handleToggleTodo = (id, checked) => {
    console.log('handleToggleTodo', id, checked);
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: checked } : todo)));
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
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo} />
    </div>
  );
}

export default AppTodo;
