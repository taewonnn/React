import { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';

interface Todo {
  id: number;
  todo: string;
  status: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, todo: 'Ex - 장보기', status: 'active' },
    { id: 2, todo: 'Ex - 공부', status: 'active' },
  ]);

  const handleAddTodo = (todo: Todo) => {
    console.log(todo);
    setTodos([...todos, todo]);
  };

  return (
    <section>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
      <AddTodo onAdd={handleAddTodo} />
    </section>
  );
}
