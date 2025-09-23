import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';

const Note = ({ id, handleDeleteNote }) => {
  const colorOptions = ['bg-yellow-300', 'bg-pink-300', 'bg-blue-300', 'bg-green-300'];

  /** textarea 참조값 */
  const textareaRef = useRef(null);

  /** 수정모드 여부 */
  const [isEditing, setIsEditing] = useState(false);

  /** 메모 내용 */
  const [content, setContent] = useState('');

  const [color, setColor] = useState(colorOptions[Math.floor(Math.random() * colorOptions.length)]);

  /** 수정 모드 시작 */
  const handleEditNote = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div className={`p-4 ${color} relative max-h-[32rem] overflow-hidden`} onClick={handleEditNote}>
      <div className='absolute top-2 right-2'>
        {isEditing ? (
          <button
            aria-label='Check Note'
            className='text-gray-700'
            onClick={e => {
              e.stopPropagation(); // 버블링 중단 -> 이거 안하면 handleEditNote도 실행되버려서 수정 종료가 안됨!
              setIsEditing(false);
            }}
          >
            <AiOutlineCheck size={20} />
          </button>
        ) : (
          <button aria-label='Close Note' className='text-gray-700' onClick={() => handleDeleteNote(id)}>
            <AiOutlineClose size={20} />
          </button>
        )}
      </div>
      <textarea
        className={`w-full h-full bg-transparent resize-none border-none focus:outline-none text-gray-900 overflow-hidden`}
        aria-label='Edit Note'
        placeholder='메모를 작성하세요.'
        style={{ height: 'auto', minHeight: '8rem' }}
        readOnly={!isEditing}
        ref={textareaRef}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      {isEditing && (
        <div className='flex space-x-2'>
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer outline outline-gray-50 ${option}`}
              aria-label={`Change color to ${option}`}
              onClick={() => setColor(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
