import { useState, useEffect } from 'react';

export default function WhyItMatters() {
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: '장보기', completed: false },
    { id: 2, text: '운동하기', completed: true },
    { id: 3, text: '코딩 공부', completed: false },
  ]);

  const [showBadExample, setShowBadExample] = useState(false);

  // 🔴 나쁜 예: 각 아이템마다 개별 이벤트 (메모리 낭비)
  const BadExample = () => {
    const [badTodoItems, setBadTodoItems] = useState([...todoItems]);

    useEffect(() => {
      const handlers = [];

      // 각 할일 아이템마다 개별 이벤트 리스너 등록 (비효율적!)
      badTodoItems.forEach(item => {
        const element = document.querySelector(`[data-bad-id="${item.id}"]`);
        if (element) {
          // 체크박스 이벤트
          const checkboxElement = element.querySelector('.bad-checkbox');
          if (checkboxElement) {
            const checkboxHandler = e => {
              e.stopPropagation();
              console.log(`❌ 나쁜 방식: 체크박스 ${item.id} 토글`);
              setBadTodoItems(prev => prev.map(i => (i.id === item.id ? { ...i, completed: !i.completed } : i)));
            };
            checkboxElement.addEventListener('click', checkboxHandler);
            handlers.push(() => checkboxElement.removeEventListener('click', checkboxHandler));
          }

          // 삭제 버튼 이벤트
          const deleteElement = element.querySelector('.bad-delete-btn');
          if (deleteElement) {
            const deleteHandler = e => {
              e.stopPropagation();
              console.log(`❌ 나쁜 방식: 아이템 ${item.id} 삭제`);
              setBadTodoItems(prev => prev.filter(i => i.id !== item.id));
            };
            deleteElement.addEventListener('click', deleteHandler);
            handlers.push(() => deleteElement.removeEventListener('click', deleteHandler));
          }

          // 아이템 전체 클릭 이벤트
          const itemHandler = () => {
            console.log(`❌ 나쁜 방식: 아이템 ${item.id} 편집 모드`);
            alert(`아이템 ${item.id} 편집 모드 진입`);
          };
          element.addEventListener('click', itemHandler);
          handlers.push(() => element.removeEventListener('click', itemHandler));
        }
      });

      // 클린업 함수 - 모든 이벤트 리스너 제거
      return () => {
        handlers.forEach(cleanup => cleanup());
      };
    }, [badTodoItems]);

    const addBadItem = () => {
      const newId = Math.max(...badTodoItems.map(i => i.id), 0) + 1;
      setBadTodoItems(prev => [
        ...prev,
        {
          id: newId,
          text: `새 할일 ${newId}`,
          completed: false,
        },
      ]);
    };

    return (
      <div style={{ padding: '20px', border: '3px solid red', borderRadius: '10px', backgroundColor: '#ffe6e6' }}>
        <h3 style={{ color: '#d63384' }}>❌ 나쁜 예: 개별 이벤트 리스너</h3>
        <p style={{ color: '#666' }}>각 아이템마다 addEventListener 호출 → 메모리 낭비!</p>

        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={addBadItem}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ➕ 새 할일 추가 (나쁜 방식)
          </button>
        </div>

        {badTodoItems.map(item => (
          <div
            key={item.id}
            data-bad-id={item.id}
            style={{
              padding: '15px',
              margin: '8px 0',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className='bad-checkbox'
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #dc3545',
                  borderRadius: '3px',
                  backgroundColor: item.completed ? '#dc3545' : 'white',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                {item.completed ? '✓' : ''}
              </button>
              <span
                style={{
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? '#666' : '#333',
                }}
              >
                📝 {item.text}
              </span>
            </div>

            <button
              className='bad-delete-btn'
              style={{
                padding: '4px 8px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
            >
              🗑️ 삭제
            </button>
          </div>
        ))}

        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8d7da', borderRadius: '5px' }}>
          <p style={{ fontSize: '12px', color: '#d63384', margin: '0' }}>
            💸 <strong>메모리 사용량:</strong> {badTodoItems.length * 3}개의 이벤트 리스너
          </p>
          <p style={{ fontSize: '11px', color: '#d63384', margin: '5px 0 0 0' }}>
            (각 아이템마다 체크박스, 삭제버튼, 아이템 클릭 = 3개씩)
          </p>
        </div>
      </div>
    );
  };

  // ✅ 좋은 예: 이벤트 위임 (버블링 활용)
  const handleGoodClick = e => {
    // 버블링을 활용해서 부모에서 모든 자식 이벤트를 처리!
    const todoItem = e.target.closest('[data-good-id]');
    if (!todoItem) return;

    const itemId = parseInt(todoItem.dataset.goodId);

    // 체크박스 클릭
    if (e.target.classList.contains('checkbox')) {
      console.log(`✅ 좋은 방식: 체크박스 ${itemId} 토글`);
      setTodoItems(prev => prev.map(item => (item.id === itemId ? { ...item, completed: !item.completed } : item)));
      e.stopPropagation(); // 버블링 중단으로 아이템 선택 방지
      return;
    }

    // 삭제 버튼 클릭
    if (e.target.classList.contains('delete-btn')) {
      console.log(`🗑️ 좋은 방식: 아이템 ${itemId} 삭제`);
      setTodoItems(prev => prev.filter(item => item.id !== itemId));
      e.stopPropagation(); // 버블링 중단
      return;
    }

    // 아이템 전체 클릭 (편집 모드)
    console.log(`📝 좋은 방식: 아이템 ${itemId} 편집 모드`);
    alert(`아이템 ${itemId} 편집 모드 진입`);
  };

  const addNewItem = () => {
    const newId = Math.max(...todoItems.map(i => i.id), 0) + 1;
    setTodoItems(prev => [
      ...prev,
      {
        id: newId,
        text: `새 할일 ${newId}`,
        completed: false,
      },
    ]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🤔 **"그래서 뭐 어쩌라는 거냐?"** - 실제 문제와 해결책</h2>

      {/* 문제 상황 설명 */}
      <div
        style={{
          backgroundColor: '#fff3cd',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid #ffc107',
        }}
      >
        <h3 style={{ color: '#856404' }}>😱 실제 발생하는 문제들</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div>
            <h4 style={{ color: '#856404' }}>🐌 성능 문제</h4>
            <ul style={{ color: '#333' }}>
              <li>할일 1000개 → 이벤트 리스너 1000개</li>
              <li>메모리 사용량 폭증</li>
              <li>브라우저 느려짐</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#856404' }}>🐛 버그 문제</h4>
            <ul style={{ color: '#333' }}>
              <li>삭제 버튼 클릭 → 아이템도 선택됨</li>
              <li>체크박스 클릭 → 편집 모드도 실행</li>
              <li>의도하지 않은 동작들</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 예제 선택 */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setShowBadExample(!showBadExample)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: showBadExample ? '#28a745' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {showBadExample ? '✅ 좋은 예 보기 (이벤트 위임)' : '❌ 나쁜 예 보기 (개별 이벤트)'}
        </button>
      </div>

      {showBadExample ? (
        <BadExample />
      ) : (
        <div
          onClick={handleGoodClick}
          style={{ padding: '20px', border: '3px solid green', borderRadius: '10px', backgroundColor: '#e6ffe6' }}
        >
          <h3 style={{ color: '#198754' }}>✅ 좋은 예: 이벤트 위임 (버블링 활용)</h3>
          <p style={{ color: '#666' }}>부모에 이벤트 리스너 1개만! 버블링으로 모든 자식 처리</p>

          <div style={{ marginBottom: '15px' }}>
            <button
              onClick={addNewItem}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ➕ 새 할일 추가
            </button>
          </div>

          {todoItems.map(item => (
            <div
              key={item.id}
              data-good-id={item.id}
              style={{
                padding: '15px',
                margin: '8px 0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  className='checkbox'
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #007bff',
                    borderRadius: '3px',
                    backgroundColor: item.completed ? '#007bff' : 'white',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  {item.completed ? '✓' : ''}
                </button>
                <span
                  style={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                    color: item.completed ? '#666' : '#333',
                  }}
                >
                  📝 {item.text}
                </span>
              </div>

              <button
                className='delete-btn'
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                }}
              >
                🗑️ 삭제
              </button>
            </div>
          ))}

          <p style={{ fontSize: '12px', color: '#198754', marginTop: '10px' }}>
            💚 메모리 사용량: 1개의 이벤트 리스너 (아이템 개수와 무관!)
          </p>
        </div>
      )}

      {/* 핵심 설명 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '10px' }}>
        <h3 style={{ color: '#0d6efd' }}>🎯 **"그래서 뭐 어쩌라는 거냐?"** 답변</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
          <div>
            <h4 style={{ color: '#0d6efd' }}>🔥 캡처링을 알아야 하는 이유</h4>
            <ul style={{ color: '#333' }}>
              <li>
                <strong>이벤트 순서 제어:</strong> 특정 이벤트를 먼저 처리하고 싶을 때
              </li>
              <li>
                <strong>보안 검사:</strong> 사용자 입력을 타겟 전에 검증
              </li>
              <li>
                <strong>전역 핸들러:</strong> 모든 클릭을 먼저 감지해야 할 때
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#0d6efd' }}>🚀 버블링을 활용하는 이유</h4>
            <ul style={{ color: '#333' }}>
              <li>
                <strong>이벤트 위임:</strong> 부모 1개로 모든 자식 처리
              </li>
              <li>
                <strong>동적 콘텐츠:</strong> 새 요소도 자동으로 이벤트 적용
              </li>
              <li>
                <strong>성능 최적화:</strong> 메모리 사용량 대폭 감소
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
          <h4 style={{ color: '#856404' }}>💡 실무에서 바로 써먹는 방법</h4>
          <ol style={{ color: '#333' }}>
            <li>
              <strong>리스트 컴포넌트:</strong> 부모에 onClick 하나만 달고 e.target으로 구분
            </li>
            <li>
              <strong>모달/팝업:</strong> 외부 클릭시 닫기 (document에 이벤트 등록)
            </li>
            <li>
              <strong>드롭다운:</strong> 다른 곳 클릭시 자동 닫기
            </li>
            <li>
              <strong>버튼 충돌 방지:</strong> e.stopPropagation()으로 의도하지 않은 이벤트 차단
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
