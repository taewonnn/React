import { useState } from 'react';
import Counter from './Counter';

export default function Main() {
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleTotal = () => {
    setTotal(total + 1);
  };

  return (
    <main>
      <h2>{'' + flag}</h2>
      <h2>total: {total}</h2>
      <button onClick={() => setFlag(prev => !prev)}>toggle flag</button>
      <Counter onTotal={handleTotal} />
      <br />
      <br />
      <Counter onTotal={handleTotal} />
      <br />
      <Counter />
    </main>
  );
}
