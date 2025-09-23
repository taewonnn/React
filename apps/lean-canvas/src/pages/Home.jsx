import { useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import { cardData } from '../data';
import ViewToggle from '../components/ViewToggle';

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
        <ViewToggle setIsGridView={setIsGridView} isGridView={isGridView} />
      </div>

      <CanvasList filteredCardData={filteredCardData} isGridView={isGridView} search={search} />
    </div>
  );
}

export default Home;
