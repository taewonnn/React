interface ICard {
  text: string;
  isDone: boolean;
  id: string;
  handleDelte: (id: string) => void;
  handleChangeStatus: (id: string) => void;
}

export default function Card({ text, isDone, id, handleDelte, handleChangeStatus }: ICard) {
  return (
    <div
      className="w-full bg-white rounded-lg shadow-md p-4 mb-3 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
      data-is-done={isDone}
      data-id={id}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button onClick={() => handleChangeStatus(id)}>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isDone ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-blue-400'
              }`}
            ></div>
          </button>
          <span
            className={`text-gray-800 font-medium ${isDone ? 'line-through text-gray-500' : ''}`}
          >
            {text}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isDone ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {isDone ? '완료' : '진행중'}
          </span>

          <button
            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
            onClick={() => handleDelte(id)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
