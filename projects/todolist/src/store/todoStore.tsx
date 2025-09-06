import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '../components/TodoList/TodoList';

const sessionStorage = {
  getItem: (name: string) => {
    const value = window.sessionStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: unknown) => {
    window.sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    window.sessionStorage.removeItem(name);
  },
};

interface IuseTodo {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, todo: string, status: string) => void;
  deleteTodo: (id: string) => void;
}

export const todoStore = create(
  persist<IuseTodo>(
    set => ({
      todos: [],
      addTodo: todo => set(state => ({ todos: [...state.todos, todo] })),
      updateTodo: (id, todo, status) =>
        set(state => ({
          todos: state.todos.map(t => (t.id === id ? { ...t, todo, status } : t)),
        })),
      deleteTodo: id => set(state => ({ todos: state.todos.filter(todo => todo.id !== id) })),
    }),
    {
      name: 'todos',
      storage: sessionStorage,
    },
  ),
);
