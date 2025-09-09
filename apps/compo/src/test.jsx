import { useEffect } from 'react';

export default function EventBubblingExample() {
  useEffect(() => {
    // body에 이벤트 리스너 추가
    const bodyHandler = e => {
      console.log('🔴 Body 클릭됨! (버블링 단계)');
    };

    // div에 이벤트 리스너 추가 (캡처링과 버블링 둘 다)
    const divElement = document.querySelector('.outer-div');
    const divCaptureHandler = e => {
      console.log('🟡 Div 캡처링 단계');
    };
    const divBubbleHandler = e => {
      console.log('🟡 Div 버블링 단계');
    };

    // span에 이벤트 리스너 추가
    const spanElement = document.querySelector('.inner-span');
    const spanHandler = e => {
      console.log('🟢 Span 클릭됨! (타겟 단계)');
      // e.stopPropagation(); // 주석을 해제하면 버블링이 중단됩니다ㅍ
    };

    // 이벤트 리스너 등록
    document.body.addEventListener('click', bodyHandler);
    if (divElement) {
      divElement.addEventListener('click', divCaptureHandler, true); // true = 캡처링 단계
      divElement.addEventListener('click', divBubbleHandler, false); // false = 버블링 단계
    }
    if (spanElement) {
      spanElement.addEventListener('click', spanHandler);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.body.removeEventListener('click', bodyHandler);
      if (divElement) {
        divElement.removeEventListener('click', divCaptureHandler, true);
        divElement.removeEventListener('click', divBubbleHandler, false);
      }
      if (spanElement) {
        spanElement.removeEventListener('click', spanHandler);
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>이벤트 캡처링 & 버블링 실습</h2>
      <p>개발자 도구 콘솔을 열고 아래 요소들을 클릭해보세요!</p>

      <div
        className='outer-div'
        style={{
          border: '3px solid blue',
          padding: '30px',
          margin: '10px',
          backgroundColor: 'lightblue',
        }}
      >
        <h3>Div 영역 (파란색)</h3>
        <p>이 div를 클릭하면 캡처링과 버블링을 모두 볼 수 있어요</p>

        <span
          className='inner-span'
          style={{
            border: '2px solid red',
            padding: '15px',
            display: 'inline-block',
            backgroundColor: 'lightcoral',
            cursor: 'pointer',
          }}
        >
          Span 영역 (빨간색) - 여기를 클릭해보세요!
        </span>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#gray', padding: '15px', borderRadius: '5px' }}>
        <h3>📝 이벤트 흐름 설명:</h3>
        <ol>
          <li>
            <strong>캡처링 단계:</strong> body → div (캡처링) → span 순서로 내려감
          </li>
          <li>
            <strong>타겟 단계:</strong> span의 실제 이벤트 핸들러 실행
          </li>
          <li>
            <strong>버블링 단계:</strong> span → div (버블링) → body 순서로 올라감
          </li>
        </ol>
        <p>
          <strong>💡 팁:</strong> span의 stopPropagation() 주석을 해제하면 버블링이 중단됩니다!
        </p>
      </div>
    </div>
  );
}
