import { useEffect, useRef, useState } from 'react';

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

function Form() {
  const [form, setForm] = useState({
    title: '',
    author: 'taewon',
    content: 'content----',
  });

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const contentRef = useRef(null);

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

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>글쓰기</legend>
        <input type='text' name='title' placeholder='제목' ref={titleRef} value={form.title} onChange={handleForm} />
        <hr />
        <input type='text' name='author' placeholder='작성자' ref={authorRef} value={form.author} onChange={handleForm} />
        <hr />
        <textarea name='content' placeholder='내용' ref={contentRef} value={form.content} onChange={handleForm} />
        <hr />
        <button>전송</button>
      </fieldset>
    </form>
  );
}

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
      <Form />
    </>
  );
}
