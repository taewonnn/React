import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EventBubblingExample from './test.jsx';
import PracticalExample from './practical-example.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [showTheory, setShowTheory] = useState(false);

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🎯 이벤트 버블링 완전 정복</h1>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setShowTheory(!showTheory)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: showTheory ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {showTheory ? '📱 실무 예제 보기' : '📚 이론 학습 보기'}
          </button>
        </div>
      </div>

      {showTheory ? (
        /* 이벤트 버블링 이론 실습 */
        <EventBubblingExample />
      ) : (
        /* 실무에서 실제로 쓰는 예제 */
        <PracticalExample />
      )}
    </>
  );
}

export default App;
