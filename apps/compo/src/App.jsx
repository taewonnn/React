import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EventBubblingExample from './test.jsx';
import PracticalExample from './practical-example.jsx';
import BubblingExplanation from './bubbling-explanation.jsx';
import WhyItMatters from './why-it-matters.jsx';
import ClosestExplanation from './closest-explanation.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [currentView, setCurrentView] = useState('closest'); // closest, why, explanation, theory, practical

  const getButtonStyle = view => ({
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: currentView === view ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0 2px',
  });

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>🎯 이벤트 버블링 완전 정복</h1>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setCurrentView('closest')} style={getButtonStyle('closest')}>
            🎯 closest() 메서드
          </button>
          <button onClick={() => setCurrentView('why')} style={getButtonStyle('why')}>
            🤔 왜 필요한가?
          </button>
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

      {currentView === 'closest' && <ClosestExplanation />}
      {currentView === 'why' && <WhyItMatters />}
      {currentView === 'explanation' && <BubblingExplanation />}
      {currentView === 'theory' && <EventBubblingExample />}
      {currentView === 'practical' && <PracticalExample />}
    </>
  );
}

export default App;
