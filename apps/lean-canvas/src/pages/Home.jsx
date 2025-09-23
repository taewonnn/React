import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaList, FaTh } from 'react-icons/fa';

let cardData = [
  { id: 1, title: '친환경 도시 농업 플랫폼', lastModified: '2023-06-15', tags: '농업' },
  { id: 2, title: 'AI 기반 건강 관리 앱', lastModified: '2023-06-10', tags: '헬스케어' },
  { id: 3, title: '온디맨드 물류 서비스', lastModified: '2023-06-05', tags: '물류' },
  { id: 4, title: 'VR 가상 여행 서비스', lastModified: '2023-06-01', tags: '여행' },
];

function Home() {
  const [isGridView, setIsGridView] = useState(true);
  const [search, setSearch] = useState('');

  const handleSearch = e => {
    console.log('input value: ', e.target.value);
    setSearch(e.target.value);
  };

  const filteredCardData = cardData.filter(card => card.title.toLowerCase().includes(search.toLowerCase()));

  // debugger
  // const filteredCardData = cardData.filter(card => {
  //   debugger;
  //   return card.title.toLowerCase().includes(search.toLowerCase());
  // });

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='mb-6 flex flex-col sm:flex-row items-center justify-between'>
        <div className='relative w-full sm:w-64 mb-4 sm:mb-0'>
          <input
            type='text'
            placeholder='검색'
            className='w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            aria-label='검색'
            value={search}
            onChange={handleSearch}
          />
          <FaSearch className='absolute left-3 top-3 text-gray-400' />
        </div>
        <div className='flex space-x-2'>
          <button
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  ${isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            aria-label='Grid view'
            onClick={() => setIsGridView(true)}
          >
            <FaTh />
          </button>
          <button
            className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  ${!isGridView ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            aria-label='List view'
            onClick={() => setIsGridView(false)}
          >
            <FaList />
          </button>
        </div>
      </div>

      {cardData.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-xl text-gray-600'>{search ? '검색 결과가 없습니다' : '목록이 없습니다'}</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} `}>
          {filteredCardData.map(card => (
            <Link
              key={card.id}
              className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105'
              to={`/canvases/${card.id}`}
            >
              <div className='p-6'>
                <h2 className='text-2xl font-bold mb-2 text-gray-800'>{card.title}</h2>
                <p className='text-sm text-gray-600 mb-4'>최근 수정일: {card.lastModified}</p>
                <span className='inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full'>
                  {card.tags}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
