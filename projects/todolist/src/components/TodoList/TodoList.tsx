import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import { todoStore } from '../../store/todoStore';

export interface Todo {
  id: string;
  todo: string;
  status: string;
}

export default function TodoList() {
  const { todos } = todoStore();

  return (
    <section>
      <ul>
        <button>Todo</button>
        <button>Doing</button>
        <button>Done</button>
      </ul>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </section>
  );
}
