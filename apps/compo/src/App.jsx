import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EventBubblingExample from './test.jsx';
import PracticalExample from './practical-example.jsx';
import BubblingExplanation from './bubbling-explanation.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [currentView, setCurrentView] = useState('explanation'); // explanation, theory, practical

  const getButtonStyle = view => ({
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: currentView === view ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px',
  });

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🎯 이벤트 버블링 완전 정복</h1>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setCurrentView('explanation')} style={getButtonStyle('explanation')}>
            📖 버블링 설명
          </button>
          <button onClick={() => setCurrentView('theory')} style={getButtonStyle('theory')}>
            🔬 이론 실습
          </button>
          <button onClick={() => setCurrentView('practical')} style={getButtonStyle('practical')}>
            💼 실무 예제
          </button>
        </div>
      </div>

      {currentView === 'explanation' && <BubblingExplanation />}
      {currentView === 'theory' && <EventBubblingExample />}
      {currentView === 'practical' && <PracticalExample />}
    </>
  );
}

export default App;
