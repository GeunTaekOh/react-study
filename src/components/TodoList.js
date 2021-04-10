import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
  return(
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/>
      ))}
    </div>
  );
};

//export default TodoList;
export default React.memo(TodoList);  //TodoListItem 을 ReactMemo 로 컴포넌트 최적화를 해줬으면 이를 TodoList 도 최적화해줘야한다.
