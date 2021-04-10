import React, { useState, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos(){
  const array=[];
  for (let i = 0; i <= 2500; i++){
    array.push({
      id:i,
      text:`할 일 ${i}`,
      checked:false,
    });
  }
  return array;
}




const App = () => {

  // const [todos, setTodos] = useState([
  //   {
  //     id:1,
  //     text:'리액트의 기초 알아보기',
  //     checked:true,
  //   },
  //   {
  //     id:2,
  //     text:'컴포넌트 스타일링 해보기',
  //     checked:true,
  //   },
  //   {
  //     id:3,
  //     text:'일정 관리 앱 만들어 보기',
  //     checked:false,
  //   },
  // ]);

  const [todos, setTodos] = useState(createBulkTodos); // 여기에 함수 이름을 적었는데, 함수처럼 () 를 같이 적으면 리렌더링될때마다 이 함수가 호출됨.

  const nextId = useRef(2501); // id 값은 렌더되지 않으므로 퍼포먼스를 위해 ref 로 만들기
  
  //onInsert 도 리랜더링 될 때마다 새로 함수를 실행하지 않도록 useCallBack 사용
  const onInsert = useCallback(
    text => {
      const todo = {
        id:nextId.current,
        text,
        checked:false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo => 
          todo.id === id ? {...todo, checked: !todo.checked} : todo,),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
