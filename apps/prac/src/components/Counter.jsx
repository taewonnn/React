import { useState } from 'react';

export default function Counter({ onTotal }) {
  const [counter, setCounter] = useState(0);

  console.log('Counter');

  const handleCounter = () => {
    // 세번한다고 바로 0에서 3이 되는게 아니라 1, 2, 3 순서대로 증가함
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    // setCounter(counter + 1);

    // 실제로 한번에 +3을 하고 싶으면? => callback 함수 이용
    setCounter(prev => prev + 1); // 0 +1 => 1
    setCounter(prev => prev + 1); // 1 +1 => 2
    setCounter(prev => prev + 1); // 2 +1 => 3

    if (onTotal) {
      onTotal();
    }

    // onTotal();
  };
  // 상태, 로직
  return <button onClick={handleCounter}>Counter: {counter}</button>;
}
