import { useState } from 'react';

export default function ClosestExplanation() {
  const [clickInfo, setClickInfo] = useState(null);
  const [highlightedElement, setHighlightedElement] = useState(null);

  const handleClick = e => {
    // 클릭된 실제 요소
    const clickedElement = e.target;

    // closest()로 찾은 요소들
    const cardElement = clickedElement.closest('.card');
    const containerElement = clickedElement.closest('.container');
    const buttonElement = clickedElement.closest('button');

    setClickInfo({
      clicked: clickedElement.tagName + (clickedElement.className ? `.${clickedElement.className}` : ''),
      card: cardElement ? 'card 찾음!' : 'card 없음',
      container: containerElement ? 'container 찾음!' : 'container 없음',
      button: buttonElement ? 'button 찾음!' : 'button 없음',
      cardData: cardElement ? cardElement.dataset.cardId : null,
    });

    // 시각적 하이라이트
    if (cardElement) {
      setHighlightedElement(cardElement.dataset.cardId);
      setTimeout(() => setHighlightedElement(null), 2000);
    }
  };

  const cards = [
    { id: 1, title: '카드 1', description: '첫 번째 카드입니다' },
    { id: 2, title: '카드 2', description: '두 번째 카드입니다' },
    { id: 3, title: '카드 3', description: '세 번째 카드입니다' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🎯 `closest()` 메서드 완벽 이해하기</h2>

      {/* 설명 섹션 */}
      <div
        style={{
          backgroundColor: '#e8f4f8',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid #4a90e2',
        }}
      >
        <h3 style={{ color: '#0d6efd' }}>📚 `closest()` 메서드란?</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
          <div>
            <h4 style={{ color: '#0d6efd' }}>🔍 동작 원리</h4>
            <ul style={{ color: '#333' }}>
              <li>
                <strong>시작점:</strong> 클릭된 요소부터
              </li>
              <li>
                <strong>방향:</strong> 위로 올라가면서 탐색
              </li>
              <li>
                <strong>조건:</strong> 선택자와 일치하는 첫 번째 요소
              </li>
              <li>
                <strong>결과:</strong> 찾으면 요소 반환, 없으면 null
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#0d6efd' }}>💡 실무 활용</h4>
            <ul style={{ color: '#333' }}>
              <li>
                <strong>이벤트 위임:</strong> 부모 요소 찾기
              </li>
              <li>
                <strong>데이터 추출:</strong> data-* 속성 읽기
              </li>
              <li>
                <strong>컴포넌트 식별:</strong> 어떤 카드인지 구분
              </li>
              <li>
                <strong>조건부 처리:</strong> 특정 영역 내부인지 확인
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 코드 예제 */}
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
      >
        <div style={{ color: '#666', marginBottom: '10px' }}>💻 실제 코드:</div>
        <div style={{ color: '#d63384' }}>
          {`const cardElement = e.target.closest('.card');`}
          <br />
          {`const cardId = cardElement?.dataset.cardId;`}
          <br />
          {`if (cardElement) { /* 카드 내부 클릭 처리 */ }`}
        </div>
      </div>

      {/* 실습 영역 */}
      <div
        className='container'
        onClick={handleClick}
        style={{
          border: '3px solid #6c757d',
          padding: '20px',
          borderRadius: '15px',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h3 style={{ color: '#333' }}>🖱️ 아래 요소들을 클릭해보세요!</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>어떤 부분을 클릭하든 `closest()`로 부모 카드를 찾을 수 있습니다</p>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}
        >
          {cards.map(card => (
            <div
              key={card.id}
              className='card'
              data-card-id={card.id}
              style={{
                border: '2px solid #007bff',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: highlightedElement == card.id ? '#fff3cd' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: highlightedElement == card.id ? '0 4px 8px rgba(0,123,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h4 style={{ color: '#007bff', margin: '0 0 10px 0' }}>{card.title}</h4>

              <p style={{ color: '#666', margin: '0 0 15px 0', fontSize: '14px' }}>{card.description}</p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className='action-btn edit-btn'
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ 수정
                </button>

                <button
                  className='action-btn delete-btn'
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  🗑️ 삭제
                </button>

                <span
                  className='tag'
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#6f42c1',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  🏷️ 태그
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 클릭 결과 표시 */}
      {clickInfo && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#d4edda',
            borderRadius: '10px',
            border: '2px solid #28a745',
          }}
        >
          <h3 style={{ color: '#155724' }}>🎯 클릭 결과 분석</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <h4 style={{ color: '#155724' }}>🖱️ 클릭된 요소</h4>
              <p
                style={{ color: '#333', fontFamily: 'monospace', backgroundColor: 'white', padding: '8px', borderRadius: '4px' }}
              >
                {clickInfo.clicked}
              </p>
            </div>
            <div>
              <h4 style={{ color: '#155724' }}>📦 찾은 카드 ID</h4>
              <p
                style={{ color: '#333', fontFamily: 'monospace', backgroundColor: 'white', padding: '8px', borderRadius: '4px' }}
              >
                {clickInfo.cardData || '없음'}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <h4 style={{ color: '#155724' }}>🔍 `closest()` 탐색 결과</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: clickInfo.card.includes('찾음') ? '#28a745' : '#dc3545',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                .card: {clickInfo.card}
              </span>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: clickInfo.container.includes('찾음') ? '#28a745' : '#dc3545',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                .container: {clickInfo.container}
              </span>
              <span
                style={{
                  padding: '4px 8px',
                  backgroundColor: clickInfo.button.includes('찾음') ? '#28a745' : '#dc3545',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                button: {clickInfo.button}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 실무 예제 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
        <h3 style={{ color: '#856404' }}>🚀 실무에서 이렇게 써요!</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
          <div>
            <h4 style={{ color: '#856404' }}>❌ closest() 없이 (복잡함)</h4>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              {`const handleClick = (e) => {`}
              <br />
              {`  let element = e.target;`}
              <br />
              {`  while (element) {`}
              <br />
              {`    if (element.classList.contains('card')) {`}
              <br />
              {`      const cardId = element.dataset.cardId;`}
              <br />
              {`      break;`}
              <br />
              {`    }`}
              <br />
              {`    element = element.parentElement;`}
              <br />
              {`  }`}
              <br />
              {`};`}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#856404' }}>✅ closest() 사용 (간단함)</h4>
            <div
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              {`const handleClick = (e) => {`}
              <br />
              {`  const card = e.target.closest('.card');`}
              <br />
              {`  if (card) {`}
              <br />
              {`    const cardId = card.dataset.cardId;`}
              <br />
              {`    // 카드 처리 로직`}
              <br />
              {`  }`}
              <br />
              {`};`}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#ffeaa7', borderRadius: '5px' }}>
          <strong style={{ color: '#856404' }}>💡 핵심 포인트:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#333' }}>
            <li>
              <code>closest('.card')</code> → 클래스로 찾기
            </li>
            <li>
              <code>closest('[data-id]')</code> → 속성으로 찾기
            </li>
            <li>
              <code>closest('button')</code> → 태그로 찾기
            </li>
            <li>
              찾지 못하면 <code>null</code> 반환
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
