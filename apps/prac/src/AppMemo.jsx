import { useState, memo, useMemo, useCallback } from 'react';
// 메모이제이션이 적용되지 않은 컴포넌트
const RegularComponent = ({ count, items = [], onCount }) => {
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
      <button onClick={onCount}>카운트 증가</button>
    </fieldset>
  );
};

// 메모이제이션이 적용된 컴포넌트
// 컴포넌트를 메모함수 이용해서 메모이제이션 적용
const MemoizedComponent = memo(({ count, items = [], onCount }) => {
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
      <button onClick={onCount}>카운트 증가</button>
    </fieldset>
  );
});

export default function AppMemo() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // useMemo를 안쓰면?
  // AppMemo 컴포넌트가 읽히면 courses 배열이 만들어짐
  // ‼️ 이 배열 내용이 변경 안되어도 object 참조값이 변경되어서 컴포넌트가 리렌더링 됨!!
  // 그래서 useMemo를 사용해서 성능 최적화를 함
  // 이 함수는 컴포넌트가 읽히면 한번만 실행되고 이후에는 실행되지 않음
  // 그래서 성능 최적화를 할 수 있음

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

  // ‼️ 함수도 obj와 마찬가지로 참조값이 변경되어 컴포넌트가 리렌더링 됨
  // useCallback을 사용해서 성능 최적화를 함
  // 이 함수는 컴포넌트가 읽히면 한번만 실행되고 이후에는 실행되지 않음
  // 그래서 성능 최적화를 할 수 있음
  const handleCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>컴포넌트 메모이제이션</h2>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <button onClick={() => setOtherState(otherState + 1)}>기타 상태 변경</button>
      <hr />
      <RegularComponent count={count} items={courses} onCount={handleCount} />
      <MemoizedComponent count={count} items={courses} onCount={handleCount} />
    </div>
  );
}
