import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { ITodo } from './TodoList';

export default function AddTodo({
  todo,
  setTodo,
}: {
  todo: ITodo[];
  setTodo: (todos: ITodo[]) => void;
}) {
  const [text, setText] = useState<string>('');

  /** input 입력값 변경 함수 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  /** 새로운 할 일 추가 함수 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim() === '') {
      alert('내용 입력해!');
      return;
    }

    setTodo([...todo, { id: uuidv4(), text: text, isDone: false, createdAt: new Date() }]); // 새로운 할 일 추가
    //세션에 추가된 할 일 저장
    sessionStorage.setItem(
      'todo',
      JSON.stringify([...todo, { id: uuidv4(), text: text, isDone: false, createdAt: new Date() }]),
    );

    setText(''); // Input 초기화
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo" className="block text-sm font-medium text-gray-700 mb-2">
            Add Todo
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              id="todo"
              placeholder="Add todo"
              value={text}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              추가
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
