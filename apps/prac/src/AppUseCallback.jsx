import React, { useEffect, useState, useCallback } from 'react';

/**
 * ✅ 시나리오: useEffect 의존성에서 불필요한 재실행 방지
 *
 * 아래 예시는 윈도우 resize 이벤트 리스너를 등록/해제하는 상황입니다.
 * - 일반적으로, 이벤트 리스너 등록/해제는 브라우저 리소스를 꽤 사용합니다.
 * - 따라서 불필요하게 여러 번 등록/해제되는 것은 피해야 합니다.
 *
 * 🧩 핵심 차이점:
 * 1) useCallback 없이 핸들러 정의 → 매 렌더마다 새 함수가 만들어져서 useEffect가 재실행됨.
 * 2) useCallback으로 핸들러 고정 → 의존성 배열이 바뀌지 않아, effect가 재실행되지 않음.
 */

export default function ResizeExample() {
  const [width, setWidth] = useState(window.innerWidth);
  const [useCb, setUseCb] = useState(true); // useCallback 사용 여부 토글

  // ❌ useCallback 사용하지 않은 버전: 매 렌더마다 새로운 함수가 생성됨
  const handleResizeNormal = () => {
    setWidth(window.innerWidth);
  };

  // ✅ useCallback 사용 버전: 동일한 참조로 유지되어 useEffect 재실행 방지
  const handleResizeStable = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  // 토글 상태에 따라 어떤 핸들러를 쓸지 선택
  const resizeHandler = useCb ? handleResizeStable : handleResizeNormal;

  useEffect(() => {
    console.log('🔁 useEffect 실행 - 이벤트 리스너 등록');
    window.addEventListener('resize', resizeHandler);

    return () => {
      console.log('❌ 이벤트 리스너 해제');
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]); // 👈 의존성에 resizeHandler가 들어있기 때문에 참조가 바뀌면 재실행됨

  return (
    <div style={{ padding: 40 }}>
      <h2>useEffect 의존성 예시 - 이벤트 리스너 재실행 방지</h2>
      <p>현재 윈도우 너비: {width}px</p>
      <label>
        <input type='checkbox' checked={useCb} onChange={e => setUseCb(e.target.checked)} />
        useCallback으로 핸들러 고정
      </label>
      <p style={{ marginTop: 10, color: '#555' }}>
        콘솔 로그를 보면 useCallback을 끄면 리렌더 시마다 이벤트 리스너가 재등록되고,
        <br />
        켜면 한 번만 등록되는 걸 확인할 수 있습니다.
      </p>
    </div>
  );
}
