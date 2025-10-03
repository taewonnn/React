// useReducer
// 한 컴포넌트에서 state 업데이트가 여러 이벤트핸들러로 분산되어 있는 경우가 있다.
// Ex. todo앱에서 setTodos를 여러 이벤트핸들러에서 사용하고 있다.
// 이런 경우 유지보수가 어려움

// => 이 문제를 해결하기 위해 state를 업데이트하는 모든 로직을 reducer를 사용해 컴포넌트 외부로 단일 함수로 관리하게 해준다.

// export default function todoReducer(state, action) {
// (state => 관리할 상태의 초기값 , action => 액션 객체)
//}
export default function todoReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      const { nextId, todoText } = action;
      draft.push({ id: nextId, text: todoText, done: false });
      break;
    }
    case 'added_index': {
      const { nextId, todoText, insertAt } = action;
      draft.splice(insertAt, 0, { id: nextId, text: todoText, done: false });
      break;
    }
    case 'deleted': {
      const { deleteId } = action;
      return draft.filter(item => item.id !== deleteId);
    }
    case 'done': {
      const { id, done } = action;
      const target = draft.find(item => item.id === id);
      target.done = done;
      break;
    }
    case 'reverse': {
      return draft.toReversed();
    }
    default: {
      throw Error('알 수 없는 액션 타입: ' + action.type);
    }
  }
}
