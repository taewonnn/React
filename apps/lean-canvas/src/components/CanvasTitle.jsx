import { useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';

function CanvasTitle({ value, onChange }) {
  const [title, setTitle] = useState(value);

  useEffect(() => {
    setTitle(value);
  }, [value]);

  // const [editingTitle, setEditingTitle] = useState(title); // 수정 중
  const [isEdit, setIsEdit] = useState(false);

  const handleDoneTitle = () => {
    setIsEdit(false);
    onChange(title);
    // setTitle(editingTitle); // e.target.value를 못하는 이유는 이 버튼 클릭 이벤트에는 value가 없기에 그러므로 editingTitle을 사용
  };

  return (
    <div className='flex items-center justify-center mb-10'>
      {isEdit ? (
        <div className='flex items-center'>
          <input
            type='text'
            className='text-4xl font-bold text-center text-blue-600 bg-transparent border-b-2 border-blue-600 focus:outline-none'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button
            className='ml-2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            aria-label='Save title'
            onClick={handleDoneTitle}
          >
            <FaCheck />
          </button>
        </div>
      ) : (
        <>
          <h1 className='text-4xl font-bold text-center '>{title}</h1>
          <button
            className='ml-2 p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
            aria-label='Edit title'
            onClick={() => setIsEdit(true)}
          >
            <FaEdit />
          </button>
        </>
      )}
    </div>
  );
}

export default CanvasTitle;
