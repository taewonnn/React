// useReducer
// 한 컴포넌트에서 state 업데이트가 여러 이벤트핸들러로 분산되어 있는 경우가 있다.
// Ex. todo앱에서 setTodos를 여러 이벤트핸들러에서 사용하고 있다.
// 이런 경우 유지보수가 어려움

// => 이 문제를 해결하기 위해 state를 업데이트하는 모든 로직을 reducer를 사용해 컴포넌트 외부로 단일 함수로 관리하게 해준다.

// export default function todoReducer(state, action) {
// (state => 관리할 상태 , action => 액션 객체)
//}

export default function todoReducer(todos, action) {
  // type => 액션의 타입
  switch (action.type) {
    case 'added': {
      return [...todos, { id: action.id, text: action.text, done: false }];
    }
    case 'added_index': {
      return [...todos.slice(0, action.index), { id: action.id, text: action.text, done: false }, ...todos.slice(action.index)];
    }
    case 'deleted': {
      return todos.filter(todo => todo.id !== action.id);
    }
    case 'done': {
      return todos.map(todo => (todo.id === action.id ? { ...todo, done: action.done } : todo));
    }
    case 'reverse': {
      return todos.toReversed();
    }
    default: {
      throw Error('Unknown action', action.type);
    }
  }
}
