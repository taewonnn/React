import { useEffect, useState } from 'react';

export default function BubblingExplanation() {
  const [logs, setLogs] = useState([]);
  const [showCapturing, setShowCapturing] = useState(true);

  const addLog = (message, color = '#333') => {
    setLogs(prev => [...prev, { id: Date.now(), message, color, time: new Date().toLocaleTimeString() }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  useEffect(() => {
    // 각 요소에 이벤트 리스너 등록
    const body = document.body;
    const outerDiv = document.querySelector('.outer-container');
    const middleDiv = document.querySelector('.middle-container');
    const innerButton = document.querySelector('.inner-button');

    // 🔴 Body 이벤트
    const bodyCapture = () => addLog('1️⃣ Body (캡처링 단계)', '#ff0000');
    const bodyBubble = () => addLog('6️⃣ Body (버블링 단계)', '#ff0000');

    // 🟠 Outer Div 이벤트
    const outerCapture = () => addLog('2️⃣ Outer Div (캡처링 단계)', '#ff8800');
    const outerBubble = () => addLog('5️⃣ Outer Div (버블링 단계)', '#ff8800');

    // 🟡 Middle Div 이벤트
    const middleCapture = () => addLog('3️⃣ Middle Div (캡처링 단계)', '#ffaa00');
    const middleBubble = () => addLog('4️⃣ Middle Div (버블링 단계)', '#ffaa00');

    // 🟢 Button 이벤트 (타겟)
    const buttonClick = e => {
      addLog('🎯 Button 클릭! (타겟 단계)', '#00aa00');

      // stopPropagation 테스트용
      if (e.target.dataset.stopBubbling === 'true') {
        e.stopPropagation();
        addLog('⛔ stopPropagation() 호출 - 버블링 중단!', '#aa0000');
      }
    };

    // 이벤트 리스너 등록
    if (showCapturing) {
      body.addEventListener('click', bodyCapture, true); // 캡처링
      outerDiv?.addEventListener('click', outerCapture, true);
      middleDiv?.addEventListener('click', middleCapture, true);
    }

    body.addEventListener('click', bodyBubble, false); // 버블링
    outerDiv?.addEventListener('click', outerBubble, false);
    middleDiv?.addEventListener('click', middleBubble, false);
    innerButton?.addEventListener('click', buttonClick, false);

    // 클린업
    return () => {
      body.removeEventListener('click', bodyCapture, true);
      body.removeEventListener('click', bodyBubble, false);
      outerDiv?.removeEventListener('click', outerCapture, true);
      outerDiv?.removeEventListener('click', outerBubble, false);
      middleDiv?.removeEventListener('click', middleCapture, true);
      middleDiv?.removeEventListener('click', middleBubble, false);
      innerButton?.removeEventListener('click', buttonClick, false);
    };
  }, [showCapturing]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>🎯 이벤트 버블링 완벽 이해하기</h2>

      {/* 설명 섹션 */}
      <div
        style={{
          backgroundColor: '#f0f8ff',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          border: '2px solid #4a90e2',
        }}
      >
        <h3>📚 이벤트 흐름 3단계</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '8px' }}>
            <h4>1️⃣ 캡처링 단계</h4>
            <p>🔽 위에서 아래로</p>
            <p>Body → Div → Button</p>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '8px' }}>
            <h4>2️⃣ 타겟 단계</h4>
            <p>🎯 실제 클릭된 요소</p>
            <p>Button의 이벤트 실행</p>
          </div>
          <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#e6f3ff', borderRadius: '8px' }}>
            <h4>3️⃣ 버블링 단계</h4>
            <p>🔼 아래에서 위로</p>
            <p>Button → Div → Body</p>
          </div>
        </div>
      </div>

      {/* 컨트롤 패널 */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={clearLogs}
          style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          🗑️ 로그 지우기
        </button>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input type='checkbox' checked={showCapturing} onChange={e => setShowCapturing(e.target.checked)} />
          캡처링 단계 보기
        </label>
      </div>

      {/* 실습 영역 */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* 이벤트 대상 요소들 */}
        <div style={{ flex: 1 }}>
          <h3>🖱️ 클릭해보세요!</h3>

          {/* Body는 전체 영역이므로 시각적으로 표현하기 위한 컨테이너 */}
          <div
            className='outer-container'
            style={{
              border: '4px solid #ff8800',
              padding: '30px',
              backgroundColor: '#fff5f0',
              borderRadius: '15px',
              cursor: 'pointer',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <strong>🟠 Outer Container (주황색)</strong>
            </div>

            <div
              className='middle-container'
              style={{
                border: '3px solid #ffaa00',
                padding: '25px',
                backgroundColor: '#fffaf0',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <strong>🟡 Middle Container (노란색)</strong>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  className='inner-button'
                  data-stop-bubbling='false'
                  style={{
                    padding: '15px 30px',
                    fontSize: '16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  🟢 일반 버튼
                </button>

                <button
                  className='inner-button'
                  data-stop-bubbling='true'
                  style={{
                    padding: '15px 30px',
                    fontSize: '16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  🔴 버블링 차단 버튼
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 로그 영역 */}
        <div style={{ flex: 1 }}>
          <h3>📋 이벤트 로그</h3>
          <div
            style={{
              border: '2px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              minHeight: '300px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {logs.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>위의 요소들을 클릭하면 이벤트 흐름이 여기에 표시됩니다.</p>
            ) : (
              logs.map(log => (
                <div
                  key={log.id}
                  style={{
                    padding: '5px 10px',
                    marginBottom: '5px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    borderLeft: `4px solid ${log.color}`,
                    fontSize: '14px',
                  }}
                >
                  <span style={{ color: '#666', fontSize: '12px' }}>[{log.time}]</span>{' '}
                  <span style={{ color: log.color, fontWeight: 'bold' }}>{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 추가 설명 */}
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
        <h3>💡 핵심 포인트</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4>🔄 이벤트 흐름 순서</h4>
            <ol>
              <li>
                <strong>캡처링:</strong> 최상위에서 타겟까지 내려감
              </li>
              <li>
                <strong>타겟:</strong> 실제 클릭된 요소에서 이벤트 실행
              </li>
              <li>
                <strong>버블링:</strong> 타겟에서 최상위까지 올라감
              </li>
            </ol>
          </div>
          <div>
            <h4>⚙️ 제어 방법</h4>
            <ul>
              <li>
                <code>addEventListener(event, handler, true)</code> - 캡처링
              </li>
              <li>
                <code>addEventListener(event, handler, false)</code> - 버블링
              </li>
              <li>
                <code>e.stopPropagation()</code> - 전파 중단
              </li>
              <li>
                <code>e.preventDefault()</code> - 기본 동작 방지
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
          <strong>🎯 실습 팁:</strong>
          <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
            <li>각 영역을 클릭해서 이벤트 순서 확인</li>
            <li>빨간 버튼으로 버블링 차단 테스트</li>
            <li>캡처링 체크박스로 캡처링 단계 on/off</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
