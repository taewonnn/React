import { useState, useEffect } from 'react';

export default function PracticalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: '아이템 1', price: 10000 },
    { id: 2, name: '아이템 2', price: 20000 },
    { id: 3, name: '아이템 3', price: 30000 },
  ]);

  // 🎯 실무 예제 1: 모달 외부 클릭시 닫기 (이벤트 버블링 활용)
  useEffect(() => {
    const handleClickOutside = e => {
      // 모달이 열려있고, 모달 내부가 아닌 곳을 클릭했을 때
      if (isModalOpen && !e.target.closest('.modal-content')) {
        console.log('🔴 모달 외부 클릭 - 모달 닫기');
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  // 🎯 실무 예제 2: 이벤트 위임 (Event Delegation)
  // 수백개의 아이템이 있어도 이벤트 리스너는 부모에 하나만!
  const handleListClick = e => {
    console.log('확인: ', e.target.classList);

    // 삭제 버튼 클릭
    if (e.target.classList.contains('delete-btn')) {
      const itemId = parseInt(e.target.dataset.id);
      console.log('🗑️ 삭제 버튼 클릭:', itemId);
      setItems(items.filter(item => item.id !== itemId));
      e.stopPropagation(); // 버블링 중단! (아이템 선택 방지)
      return;
    }

    // 수정 버튼 클릭
    if (e.target.classList.contains('edit-btn')) {
      const itemId = parseInt(e.target.dataset.id);
      console.log('✏️ 수정 버튼 클릭:', itemId);
      e.stopPropagation(); // 버블링 중단!
      return;
    }

    // 아이템 전체 클릭 (버튼이 아닌 경우)
    const itemElement = e.target.closest('.item');
    if (itemElement) {
      const itemId = parseInt(itemElement.dataset.id);
      const item = items.find(i => i.id === itemId);
      console.log('📱 아이템 선택:', item);
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  // 새 아이템 추가 (동적으로 추가되어도 이벤트 위임으로 자동 처리!)
  const addNewItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems([
      ...items,
      {
        id: newId,
        name: `새 아이템 ${newId}`,
        price: Math.floor(Math.random() * 50000) + 10000,
      },
    ]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🚀 실무에서 이벤트 버블링이 왜 필요한가?</h2>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f4f8', borderRadius: '8px' }}>
        <h3>💡 해결하는 실제 문제들:</h3>
        <ul>
          <li>
            <strong>성능 최적화:</strong> 1000개 아이템에 각각 이벤트 달지 않고 부모 1개에만
          </li>
          <li>
            <strong>동적 콘텐츠:</strong> 새로 추가된 아이템도 자동으로 이벤트 적용
          </li>
          <li>
            <strong>모달/드롭다운:</strong> 외부 클릭시 자동 닫기
          </li>
          <li>
            <strong>메모리 절약:</strong> 이벤트 리스너 개수 최소화
          </li>
        </ul>
      </div>

      <button onClick={addNewItem} style={{ marginBottom: '10px', padding: '8px 16px' }}>
        ➕ 새 아이템 추가
      </button>

      {/* 🎯 이벤트 위임 예제: 부모에 하나의 이벤트만! */}
      <div
        className='item-list'
        onClick={handleListClick}
        style={{ border: '2px solid #ddd', borderRadius: '8px', padding: '10px' }}
      >
        <h3>📋 상품 목록 (클릭해보세요!)</h3>
        <p style={{ fontSize: '12px', color: '#666' }}>
          💡 부모 div에 이벤트 리스너 1개만 있지만, 모든 자식 요소의 클릭을 처리합니다
        </p>

        {items.map(item => (
          <div
            key={item.id}
            className='item'
            data-id={item.id}
            style={{
              border: '1px solid #ccc',
              margin: '5px 0',
              padding: '10px',
              borderRadius: '4px',
              backgroundColor: selectedItem?.id === item.id ? '#fff3cd' : '#f8f9fa',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{item.name}</strong> - {item.price.toLocaleString()}원
              </div>
              <div>
                <button
                  className='edit-btn'
                  data-id={item.id}
                  style={{
                    marginRight: '5px',
                    padding: '4px 8px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                  }}
                >
                  ✏️ 수정
                </button>
                <button
                  className='delete-btn'
                  data-id={item.id}
                  style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                  🗑️ 삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🎯 모달 외부 클릭 닫기 예제 */}
      {isModalOpen && (
        <div
          className='modal-overlay'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className='modal-content'
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              minWidth: '300px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h3>📱 선택된 아이템</h3>
            {selectedItem && (
              <div>
                <p>
                  <strong>이름:</strong> {selectedItem.name}
                </p>
                <p>
                  <strong>가격:</strong> {selectedItem.price.toLocaleString()}원
                </p>
              </div>
            )}
            <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
              💡 모달 외부(회색 배경)를 클릭하면 자동으로 닫힙니다!
            </p>
            <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '10px', padding: '8px 16px' }}>
              닫기
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
        <h3>🤔 만약 이벤트 버블링을 모른다면?</h3>
        <ul>
          <li>
            각 아이템마다 개별 이벤트 리스너 → <strong>메모리 낭비</strong>
          </li>
          <li>
            새 아이템 추가할 때마다 이벤트 다시 등록 → <strong>코드 복잡</strong>
          </li>
          <li>
            모달 닫기 기능 구현 어려움 → <strong>UX 나쁨</strong>
          </li>
          <li>
            버튼 클릭시 부모 이벤트도 실행 → <strong>버그 발생</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
