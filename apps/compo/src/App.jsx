import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import EventBubblingExample from './test.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* 이벤트 버블링 실습 컴포넌트 */}
      <EventBubblingExample />
    </>
  );
}

export default App;
