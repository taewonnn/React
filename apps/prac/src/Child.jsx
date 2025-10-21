import React from 'react';

function Child({ onClick }) {
  console.log('🔵 Child 렌더링');

  return (
    <div>
      <button onClick={onClick}>자식 버튼</button>
    </div>
  );
}

export default React.memo(Child);
