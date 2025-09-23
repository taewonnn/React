import CanvasItem from './CanvasItem';

function CanvasList({ cards, filteredCardData, isGridView, search, onDelete }) {
  // 데이터 없을 떄
  if (cards.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='text-xl text-gray-600'>{search ? '검색 결과가 없습니다' : '목록이 없습니다'}</p>
      </div>
    );
  }

  // 데이터 있을 때
  return (
    <div className={`grid gap-6 ${isGridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} `}>
      {filteredCardData.map(card => (
        <CanvasItem
          key={card.id}
          {...card}
          onDelete={e => {
            e.preventDefault(); // 기본동작 막기
            onDelete(card.id);
          }}
        />
      ))}
    </div>
  );
}

export default CanvasList;
