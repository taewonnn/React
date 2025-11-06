import React, { useEffect, useState, useCallback, useMemo } from 'react';

/**
 * 🎯 useCallback과 useEffect 관계 완전 정복
 *
 * ❓ 질문: "useCallback을 사용하는 경우가 useEffect 안에서 실행할 함수를 넣으면 무한 리렌더링이 나니까 사용한다?"
 *
 * ✅ 정답: 부분적으로 맞지만 정확하지 않습니다!
 *
 * 🔍 정확한 설명:
 * 1. useCallback은 무한 리렌더링을 "방지"하는 것이 아니라 "불필요한 useEffect 재실행"을 방지합니다
 * 2. 무한 리렌더링은 보통 useEffect 내에서 state를 변경할 때 발생합니다
 * 3. useCallback은 함수의 참조값을 안정화시켜 useEffect의 의존성 배열을 최적화합니다
 */

// 🧪 실험 1: 무한 리렌더링 시나리오 (useCallback과 관계없음)
function InfiniteRenderExample() {
  const [count, setCount] = useState(0);

  // ❌ 이것이 진짜 무한 리렌더링의 원인! (useCallback과 무관)
  // useEffect(() => {
  //   console.log('💥 무한 리렌더링 발생!');
  //   setCount(prev => prev + 1); // 의존성 배열 없이 state 변경 → 무한 루프!
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }); // 의도적으로 의존성 배열 없음 (무한 리렌더링 시연용)

  return <div>카운트: {count} (곧 브라우저가 멈출 것입니다!)</div>;
}

// 🧪 실험 2: useCallback의 진짜 역할
function UseCallbackRealPurpose() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ useCallback 없는 함수 - 매번 새로운 참조값 (의도적으로 useCallback 미사용)
  const fetchDataWithoutCallback = () => {
    console.log('🔄 API 호출 (useCallback 없음)');
    // 가상의 API 호출
  };

  // ✅ useCallback 있는 함수 - 안정된 참조값
  const fetchDataWithCallback = useCallback(() => {
    console.log('📡 API 호출 (useCallback 있음)');
    // 가상의 API 호출
  }, []);

  // 🔍 핵심: useEffect가 언제 재실행되는지 관찰
  useEffect(() => {
    console.log('🎯 useEffect 실행 - fetchDataWithoutCallback 의존성');
    fetchDataWithoutCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDataWithoutCallback]); // 의도적으로 함수를 의존성에 포함 (useCallback 효과 시연용)

  useEffect(() => {
    console.log('✅ useEffect 실행 - fetchDataWithCallback 의존성');
    fetchDataWithCallback();
  }, [fetchDataWithCallback]); // 한 번만 실행됨!

  return (
    <div style={{ padding: 20, border: '1px solid #ddd', margin: 10 }}>
      <h3>🔬 useCallback의 진짜 역할</h3>
      <p>카운트: {count}</p>
      <p>기타 상태: {otherState}</p>
      <button onClick={() => setCount(c => c + 1)}>카운트 증가</button>
      <button onClick={() => setOtherState(s => s + 1)}>기타 상태 변경</button>
      <p style={{ fontSize: 12, color: '#666' }}>"기타 상태 변경" 버튼을 클릭하고 콘솔을 확인해보세요!</p>
    </div>
  );
}

// 🧪 실험 3: 이벤트 리스너 예시 (원래 코드 개선)
function EventListenerExample() {
  const [width, setWidth] = useState(window.innerWidth);
  const [useCallbackToggle, setUseCallbackToggle] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  // 렌더링 횟수 추적 (의도적으로 매 렌더마다 실행)
  // useEffect(() => {
  //   setRenderCount(prev => prev + 1);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }); // 의도적으로 의존성 배열 없음 (렌더링 횟수 추적용)

  // ❌ useCallback 없는 핸들러
  const handleResizeNormal = () => {
    setWidth(window.innerWidth);
  };

  // ✅ useCallback 있는 핸들러
  const handleResizeStable = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  const resizeHandler = useCallbackToggle ? handleResizeStable : handleResizeNormal;

  useEffect(() => {
    console.log(`🔄 useEffect 실행 (${useCallbackToggle ? 'useCallback 사용' : 'useCallback 미사용'})`);
    window.addEventListener('resize', resizeHandler);

    return () => {
      console.log(`❌ 이벤트 리스너 해제 (${useCallbackToggle ? 'useCallback 사용' : 'useCallback 미사용'})`);
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler, useCallbackToggle]);

  return (
    <div style={{ padding: 20, border: '1px solid #ddd', margin: 10 }}>
      <h3>🎧 이벤트 리스너 최적화</h3>
      <p>현재 윈도우 너비: {width}px</p>
      <p>렌더링 횟수: {renderCount}</p>
      <label>
        <input type='checkbox' checked={useCallbackToggle} onChange={e => setUseCallbackToggle(e.target.checked)} />
        useCallback 사용
      </label>
      <p style={{ fontSize: 12, color: '#666' }}>체크박스를 토글하고 콘솔을 확인해보세요. 윈도우 크기를 조절해보세요!</p>
    </div>
  );
}

// 🧪 실험: 패턴 2 vs useCallback 차이점 비교
function Pattern2VsUseCallback() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ 패턴 2: useEffect 내부에서 함수 정의
  useEffect(() => {
    const fetchUserData = () => {
      console.log('📦 패턴 2: 사용자 데이터 가져오기');
      // API 호출 시뮬레이션
    };

    fetchUserData();
  }, []); // 한 번만 실행

  // ✅ useCallback: 함수를 다른 곳에서도 사용 가능
  const fetchUserDataWithCallback = useCallback(() => {
    console.log('🎯 useCallback: 사용자 데이터 가져오기');
    // API 호출 시뮬레이션
  }, []);

  useEffect(() => {
    fetchUserDataWithCallback();
  }, [fetchUserDataWithCallback]);

  // 🔍 차이점 1: 함수 재사용성
  const handleRefresh = () => {
    // fetchUserData(); // ❌ 패턴 2는 useEffect 내부에 있어서 사용 불가!
    fetchUserDataWithCallback(); // ✅ useCallback은 어디서든 사용 가능!
  };

  // 🔍 차이점 2: 의존성이 있는 경우
  useEffect(() => {
    // 패턴 2: 의존성이 있으면 함수가 매번 새로 생성됨 (문제없음)
    const fetchUserProfile = () => {
      console.log(`📦 패턴 2: ${name}의 프로필 가져오기`);
    };

    if (name) {
      fetchUserProfile();
    }
  }, [name]); // name이 변경될 때마다 실행

  // useCallback: 의존성 관리가 명확함
  const fetchUserProfileWithCallback = useCallback(() => {
    console.log(`🎯 useCallback: ${name}의 프로필 가져오기`);
  }, [name]); // name이 변경될 때만 함수 재생성

  useEffect(() => {
    if (name) {
      fetchUserProfileWithCallback();
    }
  }, [name, fetchUserProfileWithCallback]);

  return (
    <div style={{ padding: 20, border: '2px solid #28a745', margin: 10, borderRadius: 8 }}>
      <h3>🤔 패턴 2 vs useCallback 차이점</h3>

      <div style={{ marginBottom: 15 }}>
        <input
          type='text'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ padding: '5px 10px', marginRight: 10, border: '1px solid #ddd', borderRadius: 4 }}
        />
        <button
          onClick={handleRefresh}
          style={{ padding: '5px 10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: 4 }}
        >
          새로고침 (useCallback만 가능!)
        </button>
      </div>

      <div style={{ padding: 10, backgroundColor: '#d4edda', borderRadius: 4 }}>
        <h4>📊 언제 어떤 패턴을 사용할까?</h4>
        <ul style={{ fontSize: 12, margin: 0, lineHeight: 1.4 }}>
          <li>
            <strong>패턴 2 (useEffect 내부)</strong>: 간단하고 한 곳에서만 사용하는 함수
          </li>
          <li>
            <strong>useCallback</strong>: 여러 곳에서 재사용하거나 자식 컴포넌트에 전달하는 함수
          </li>
          <li>
            <strong>성능</strong>: 단순한 경우엔 거의 동일, 복잡한 의존성이 있으면 useCallback이 유리
          </li>
        </ul>
      </div>
    </div>
  );
}

// 🧪 실험: 콜백을 의존성으로 쓰는 훅들의 불필요한 재실행 사례
function CallbackDependencyExamples() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', age: 25, role: 'developer' },
    { id: 2, name: 'Bob', age: 30, role: 'designer' },
    { id: 3, name: 'Charlie', age: 28, role: 'manager' },
  ]);

  // ❌ 사례 1: useEffect에서 함수를 의존성으로 사용 (매번 재실행)
  const fetchUserData = userId => {
    console.log('🔄 사례 1: API 호출 (매번 재실행됨)');
    // 실제로는 fetch(`/api/users/${userId}`)
  };

  useEffect(() => {
    fetchUserData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUserData]); // fetchUserData가 매 렌더마다 새로운 함수이므로 계속 재실행

  // ✅ 해결책 1: useCallback 사용
  const fetchUserDataOptimized = useCallback(userId => {
    console.log('✅ 사례 1 해결: API 호출 (한 번만 실행됨)');
  }, []);

  useEffect(() => {
    fetchUserDataOptimized(1);
  }, [fetchUserDataOptimized]);

  // ❌ 사례 2: useMemo에서 함수를 의존성으로 사용
  const filterUsers = (users, term) => {
    console.log('🔄 사례 2: 사용자 필터링 (매번 재계산됨)');
    return users.filter(user => user.name.toLowerCase().includes(term.toLowerCase()));
  };

  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searchTerm, filterUsers]); // filterUsers가 매번 새로운 함수

  // ✅ 해결책 2: useCallback으로 함수 메모이제이션
  const filterUsersOptimized = useCallback((users, term) => {
    console.log('✅ 사례 2 해결: 사용자 필터링 (필요할 때만 재계산)');
    return users.filter(user => user.name.toLowerCase().includes(term.toLowerCase()));
  }, []);

  const filteredUsersOptimized = useMemo(() => {
    return filterUsersOptimized(users, searchTerm);
  }, [users, searchTerm, filterUsersOptimized]);

  // ❌ 사례 3: 복잡한 계산 함수를 여러 곳에서 사용
  const calculateUserStats = users => {
    console.log('🔄 사례 3: 통계 계산 (매번 재계산됨)');
    return {
      total: users.length,
      avgAge: users.reduce((sum, user) => sum + user.age, 0) / users.length,
      roles: [...new Set(users.map(user => user.role))],
    };
  };

  // 여러 useMemo에서 같은 함수 사용
  const userStats = useMemo(() => {
    return calculateUserStats(filteredUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredUsers, calculateUserStats]);

  const sortedUsers = useMemo(() => {
    const stats = calculateUserStats(users);
    console.log('🔄 사례 3: 정렬 계산 (매번 재계산됨)');
    return users.sort((a, b) => {
      if (sortBy === 'age') return a.age - b.age;
      return a.name.localeCompare(b.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, sortBy, calculateUserStats]);

  // ✅ 해결책 3: useCallback으로 함수 안정화
  const calculateUserStatsOptimized = useCallback(users => {
    console.log('✅ 사례 3 해결: 통계 계산 (필요할 때만 재계산)');
    return {
      total: users.length,
      avgAge: users.reduce((sum, user) => sum + user.age, 0) / users.length,
      roles: [...new Set(users.map(user => user.role))],
    };
  }, []);

  const userStatsOptimized = useMemo(() => {
    return calculateUserStatsOptimized(filteredUsersOptimized);
  }, [filteredUsersOptimized, calculateUserStatsOptimized]);

  // ❌ 사례 4: 이벤트 핸들러를 useEffect에서 사용
  const handleScroll = () => {
    console.log('🔄 사례 4: 스크롤 이벤트 (매번 리스너 재등록)');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll]); // handleScroll이 매번 새로운 함수

  // ✅ 해결책 4: useCallback으로 이벤트 핸들러 안정화
  const handleScrollOptimized = useCallback(() => {
    console.log('✅ 사례 4 해결: 스크롤 이벤트 (한 번만 등록)');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollOptimized);
    return () => window.removeEventListener('scroll', handleScrollOptimized);
  }, [handleScrollOptimized]);

  return (
    <div style={{ padding: 20, border: '2px solid #dc3545', margin: 10, borderRadius: 8 }}>
      <h3>🚨 콜백 의존성 문제 사례들</h3>

      <div style={{ marginBottom: 15 }}>
        <input
          type='text'
          placeholder='사용자 검색...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '5px 10px', marginRight: 10, border: '1px solid #ddd', borderRadius: 4 }}
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ padding: '5px 10px', border: '1px solid #ddd', borderRadius: 4 }}
        >
          <option value='name'>이름순</option>
          <option value='age'>나이순</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12 }}>
        <div style={{ padding: 10, backgroundColor: '#f8d7da', borderRadius: 4 }}>
          <h4>❌ 문제가 있는 코드들</h4>
          <p>필터된 사용자: {filteredUsers.length}명</p>
          <p>통계: 평균 나이 {userStats?.avgAge?.toFixed(1)}세</p>
          <p>정렬된 사용자: {sortedUsers.length}명</p>
        </div>

        <div style={{ padding: 10, backgroundColor: '#d4edda', borderRadius: 4 }}>
          <h4>✅ 최적화된 코드들</h4>
          <p>필터된 사용자: {filteredUsersOptimized.length}명</p>
          <p>통계: 평균 나이 {userStatsOptimized?.avgAge?.toFixed(1)}세</p>
        </div>
      </div>

      <div style={{ marginTop: 15, padding: 10, backgroundColor: '#fff3cd', borderRadius: 4 }}>
        <h4>🔍 콘솔에서 확인해보세요!</h4>
        <p style={{ fontSize: 11, margin: 0 }}>
          검색어를 입력하거나 정렬 방식을 변경할 때 어떤 함수들이 몇 번 실행되는지 관찰해보세요.
        </p>
      </div>
    </div>
  );
}

export default function AppUseCallback() {
  const [showInfinite, setShowInfinite] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 useCallback과 useEffect 관계 완전 이해</h1>

      <div style={{ marginBottom: 20, padding: 15, backgroundColor: '#f0f8ff', borderRadius: 8 }}>
        <h2>💡 핵심 개념 정리</h2>
        <ul style={{ lineHeight: 1.6 }}>
          <li>
            <strong>useCallback ≠ 무한 리렌더링 방지</strong>
          </li>
          <li>
            <strong>useCallback = useEffect 불필요한 재실행 방지</strong>
          </li>
          <li>
            <strong>무한 리렌더링 = useEffect 내 state 변경 + 잘못된 의존성</strong>
          </li>
          <li>
            <strong>useCallback = 함수 참조값 안정화</strong>
          </li>
        </ul>
      </div>

      <CallbackDependencyExamples />
      <Pattern2VsUseCallback />
      <UseCallbackRealPurpose />
      <EventListenerExample />

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setShowInfinite(!showInfinite)}
          style={{
            padding: '10px 20px',
            backgroundColor: showInfinite ? '#dc3545' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
          }}
        >
          {showInfinite ? '⚠️ 무한 리렌더링 중지' : '💥 무한 리렌더링 시연 (주의!)'}
        </button>
        {showInfinite && (
          <div style={{ marginTop: 10, padding: 10, backgroundColor: '#ffe6e6', borderRadius: 4 }}>
            <p style={{ color: '#d63384', fontWeight: 'bold' }}>
              ⚠️ 주의: 아래 컴포넌트는 의도적으로 무한 리렌더링을 발생시킵니다!
            </p>
            <InfiniteRenderExample />
          </div>
        )}
      </div>
    </div>
  );
}
