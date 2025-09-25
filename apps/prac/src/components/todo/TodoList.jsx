function TodoList({ todos = [], onDeleteTodo, onToggleTodo }) {
  return (
    <ul>
      {todos.map(item => (
        <li key={item.id}>
          <input
            id={item.id}
            type='checkbox'
            checked={item.done}
            onChange={e => {
              console.log('test', e.target.checked);
              onToggleTodo(item.id, e.target.checked);
            }}
          />
          <span>{item.done ? <del>{item.text}</del> : item.text}</span>
          <button onClick={() => onDeleteTodo(item.id)}>X</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
