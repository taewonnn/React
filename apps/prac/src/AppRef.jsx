import { forwardRef, useEffect, useRef, useState } from 'react';

let counter = 0; // 전역 변수

function ButtonCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    counter++;
    console.log('counter: ', counter);
    setCount(count + 1);
  };

  return (
    <>
      <button onClick={handleClick}> globalCount</button>
    </>
  );
}

/**
 * forwardRef
 * 컴포넌트에 대한 참조값을 얻을 수 있음
 */
const MyForm = forwardRef((props, ref) => {
  const [form, setForm] = useState({
    title: '',
    author: 'taewon',
    content: 'content----',
  });

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const contentRef = useRef(null);

  const formRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('title: ', titleRef.current);
    console.log('author: ', authorRef.current);
    console.log('content: ', contentRef.current);

    if (!form.title) {
      titleRef.current.focus();
      return;
    }

    if (!form.author) {
      authorRef.current.focus();
      return;
    }

    if (!form.content) {
      contentRef.current.focus();
      return;
    }
  };

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log('formRef: ', formRef);
  }, []);
  return (
    <div ref={ref}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <fieldset>
          <legend>글쓰기</legend>
          <input type='text' name='title' placeholder='제목' ref={titleRef} value={form.title} onChange={handleForm} />
          <hr />
          <input type='text' name='author' placeholder='작성자' ref={authorRef} value={form.author} onChange={handleForm} />
          <hr />
          <textarea name='content' placeholder='내용' ref={contentRef} value={form.content} onChange={handleForm} />
          <hr />
          <button disabled={!form.title || !form.author || !form.content}>전송</button>
        </fieldset>
      </form>
    </div>
  );
});

export default function AppRef() {
  const countRef = useRef(0);

  console.log('✅ 리렌더링!');

  // useRef
  const handleClick = () => {
    console.log('countRef: ', countRef.current);
    // useRef는 값을 변경해도 리렌더링 되지 않음 => 메모리 영역에 저장되기 때문에
    // 컴포넌트가 리렌더링 되도 메모리 영역에 저장된 값은 유지되기에 useRef를 사용하면 값을 유지할 수 있음
    countRef.current++;
  };

  /** 컴포넌트에 대한 참조값은 얻을 수 없음  -> React.forwardRef 사용 필요 */
  const myFormRef = useRef(null);

  useEffect(() => {
    console.log('myFormRef: ', myFormRef); // myFormRef:  {current: null}
  }, []);

  return (
    <>
      <h2>Count</h2>
      {/* 전역 변수 */}
      <ButtonCounter />
      {/* 이 버튼 클릭하면 1부터 증가가 아님! 왜냐하면 전역 변수이기 때문에 컴포넌트가 리렌더링 되도 전역 변수는 유지되기 때문에 */}
      <ButtonCounter />
      {/* useRef */}
      <button onClick={handleClick}>ref Count</button>

      <h2>Form</h2>
      <MyForm ref={myFormRef} />
    </>
  );
}
