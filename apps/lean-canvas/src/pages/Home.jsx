import { useState } from 'react';
import { FaSearch, FaList, FaTh } from 'react-icons/fa';
import CanvasItem from '../components/CanvasItem';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';

export let cardData = [
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
        <SearchBar search={search} handleSearch={handleSearch} />
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

      <CanvasList filteredCardData={filteredCardData} isGridView={isGridView} search={search} />
    </div>
  );
}

export default Home;
