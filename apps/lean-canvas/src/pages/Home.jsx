import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../api/canvas';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData(params) {
    const res = await getCanvases(params);
    setData(res.data);
  }

  useEffect(() => {
    console.log('검색어:', searchText);
    // 빈 문자열이면 모든 데이터를 가져오고, 값이 있으면 해당 제목으로 필터링
    fetchData(searchText ? { title: searchText } : {});
  }, [searchText]);

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  // const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

  // ✅ debugger
  // const filteredCardData = cardData.filter(card => {
  //   debugger;
  //   return card.title.toLowerCase().includes(search.toLowerCase());
  // });

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='mb-6 flex flex-col sm:flex-row items-center justify-between'>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* 뷰 토글 UI */}
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {/* 캔버스 리스트 UI */}
      <CanvasList filteredData={data} isGridView={isGridView} searchText={searchText} onDelete={handleDeleteItem} />
    </div>
  );
}

export default Home;
