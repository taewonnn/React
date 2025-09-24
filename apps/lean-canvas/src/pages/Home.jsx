import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases } from '../api/canvas';
import Error from '../components/Error';
import Loading from '../components/Loading';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(params) {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise(resolver => setTimeout(resolver, 2000)); // 2초 딜레이
      const res = await getCanvases(params);
      setData(res.data);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // 빈 문자열이면 모든 데이터를 가져오고, 값이 있으면 해당 제목으로 필터링
    fetchData(searchText ? { title_like: searchText } : {});
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
    <>
      <div className='mb-6 flex flex-col sm:flex-row items-center justify-between'>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {/* 뷰 토글 UI */}
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={() => fetchData({ title_like: searchText })} />}
      {/* 캔버스 리스트 UI */}
      {!isLoading && !error && (
        <CanvasList filteredData={data} isGridView={isGridView} searchText={searchText} onDelete={handleDeleteItem} />
      )}
    </>
  );
}

export default Home;
