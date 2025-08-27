import { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';

export interface Todo {
  id: string;
  todo: string;
  status: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', todo: 'Ex - 장보기', status: 'active' },
    { id: '2', todo: 'Ex - 공부', status: 'active' },
  ]);

  const handleAddTodo = (todo: Todo) => {
    console.log(todo);
    setTodos([...todos, todo]);
  };

  const handleUpdateTodo = (id: string, newTodoText: string, newStatus?: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, todo: newTodoText, status: newStatus || todo.status } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <section>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} />
        ))}
      </ul>
      <AddTodo onAdd={handleAddTodo} />
    </section>
  );
}
