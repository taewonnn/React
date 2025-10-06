import { useEffect, useState } from 'react';

function Courses() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');

  // ‼️무한 루프에 빠짐
  // list가 변경됨 -> AppEffect 호출 ->  fetch 실행 -> list가 변경됨 -> AppEffect 호출 ->  fetch 실행 -> ...

  // fetch('data/course_all.json')
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log('data 조회 성공');
  //     console.log('res: ', res);
  //     setList(res);
  //   });

  useEffect(() => {
    fetch('data/course_all.json')
      .then(res => res.json())
      .then(res => {
        console.log('data 조회 성공');
        console.log('res: ', res);

        if (filter === 'favorite') {
          setList(res.filter(item => item.isFavorite));
        } else {
          setList(res);
        }
      });

    return () => {
      console.log('unmount / 연결 해제');
    };
  }, [filter]);

  return (
    <>
      <label htmlFor='all'>전체</label>
      <input id='all' type='radio' value='all' checked={filter === 'all'} onChange={e => setFilter(e.target.value)} />
      <label htmlFor='favorite'>좋아요</label>
      <input
        id='favorite'
        type='radio'
        value='favorite'
        checked={filter === 'favorite'}
        onChange={e => setFilter(e.target.value)}
      />

      <ul>
        {list.map(item => {
          return <li key={item.id}> {item.title} </li>;
        })}
      </ul>
    </>
  );
}

export default function AppEffect() {
  // ‼️ DOM 조작
  useEffect(() => {
    // DOM이 마운트 된 이후에 실행시켜!
    const h2 = document.querySelector('#title');
    // console.log('h2: ', h2);
    h2.textContent = 'Data Fetching';
    return () => {
      // console.log('unmount');
    };
  }, []);

  const [show, setShow] = useState(true);

  return (
    <>
      <h2 id='title'>데이터 가져오기</h2>
      <button onClick={() => setShow(prev => !prev)}>toggle</button>
      <hr />
      {show && <Courses />}
    </>
  );
}
