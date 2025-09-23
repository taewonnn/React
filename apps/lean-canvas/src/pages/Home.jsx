import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    const data = await fetch('http://localhost:8000/canvases')
      .then(res => res.json())
      .catch(console.error);
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };

  const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

  // ✅ debugger
  // const filteredCardData = cardData.filter(card => {
  //   debugger;
  //   return card.title.toLowerCase().includes(search.toLowerCase());
  // });

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='mb-6 flex flex-col sm:flex-row items-center justify-between'>
        {/* 검색 UI */}
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* 뷰 토글 UI */}
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {/* 캔버스 리스트 UI */}
      <CanvasList filteredData={filteredData} isGridView={isGridView} searchText={searchText} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default Home;
