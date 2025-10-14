import { useState, memo, useMemo } from 'react';
// 메모이제이션이 적용되지 않은 컴포넌트
const RegularComponent = ({ count, items }) => {
  console.log('RegularComponent 렌더링');

  return (
    <fieldset>
      <legend>일반 컴포넌트</legend>
      <div>{count}</div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </fieldset>
  );
};

// 메모이제이션이 적용된 컴포넌트
// 컴포넌트를 메모함수 이용해서 메모이제이션 적용
const MemoizedComponent = memo(({ count, items }) => {
  console.log('MemoizedComponent 렌더링');
  return (
    <fieldset>
      <legend>메모이제이션 컴포넌트</legend>
      <div>{count}</div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </fieldset>
  );
});

export default function AppMemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const courses = useMemo(() => {
    return [
      { id: 0, text: '리액트 강의', level: 1 },
      { id: 1, text: '자바스크립트 강의', level: 1 },
      { id: 2, text: '타입스크립트 강의', level: 2 },
      { id: 3, text: '리액트 네이티브 강의', level: 2 },
      { id: 4, text: '프로젝트 강의', level: 3 },
      { id: 5, text: '리액트 라우터 강의', level: 3 },
      { id: 6, text: '리액트 컴포넌트 강의', level: 3 },
    ];
  }, []);

  return (
    <div>
      <h2>컴포넌트 메모이제이션</h2>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <button onClick={() => setOtherState(otherState + 1)}>기타 상태 변경</button>
      <hr />
      <RegularComponent count={count} items={courses} />
      <MemoizedComponent count={count} items={courses} />
    </div>
  );
}
