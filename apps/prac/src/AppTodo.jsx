import { useReducer, useState } from 'react';
import './App.css';
import TodoList from './components/todo/TodoList';
import todoReducer from './reducer/todo-reducer';
// import { useImmerReducer } from 'use-immer';

function AppTodo() {
  const [todoText, setTodoText] = useState('');
  // const [todos, setTodos] = useState([
  //   { id: 0, text: 'HTML&CSS 공부하기', done: true },
  //   { id: 1, text: '자바스크립트 공부하기', done: false },
  // ]);

  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 0, text: 'HTML&CSS 공부하기', done: true },
    { id: 1, text: '자바스크립트 공부하기', done: false },
  ]);

  // 추가
  const handleAddTodo = () => {
    if (!todoText) alert('할일을 입력하세요.');

    const nextId = todos.length + Math.floor(Math.random() * 10000);
    dispatch({ type: 'added', id: nextId, text: todoText });

    // setTodos([...todos, { id: nextId, text: todoText }]);

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

  // 제거
  const handleDeleteTodo = id => {
    dispatch({ type: 'deleted', id });
    //setTodos(todos.filter(todo => todo.id !== id));
  };

  // 인덱스 기반 추가  => n번째에 추가
  const handleAddTodoByIndex = () => {
    // n번째에 추가
    const n = parseInt(document.getElementById('order').value);
    const nextId = todos.length + Math.floor(Math.random() * 10000);

    dispatch({ type: 'added_index', index: n, id: nextId, text: todoText });
    // setTodos([...todos.slice(0, n), { id: nextId, text: todoText, done: false }, ...todos.slice(n)]);
  };

  // 완료 토글
  const handleToggleTodo = (id, checked) => {
    console.log('handleToggleTodo', id, checked);
    dispatch({ type: 'done', id, done: checked });
    //setTodos(todos.map(todo => (todo.id === id ? { ...todo, done: checked } : todo)));
  };

  // reverse
  const handleReverse = () => {
    // 새로운 배열로 복사
    // const nextTodos = [...todos];
    // setTodos(nextTodos.reverse());

    // ✅ toReversed() - 새로운 배열을 반환 (non-mutating)
    // React가 참조 비교를 했을 때 다른 배열이므로 변화를 감지합니다

    dispatch({ type: 'reverse' });
    // setTodos(todos.toReversed());
  };

  return (
    <div>
      <h2>할일목록</h2>
      <div>
        <input
          type='text'
          placeholder='할일을 입력하세요.'
          value={todoText}
          onChange={handleChangeTodoText}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>

      <div>
        <select name='order' id='order'>
          {todos.map((_, index) => (
            <option key={index} value={index}>
              {index}번째
            </option>
          ))}
        </select>
        <button onClick={handleAddTodoByIndex}>0번째 추가</button>
      </div>
      <div>Preview: {todoText}</div>
      <button onClick={handleReverse}>Reverse</button>
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo} />
    </div>
  );
}

export default AppTodo;
