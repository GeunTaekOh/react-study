import React, { useReducer, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos(){
  const array=[];
  for (let i = 1; i <= 2500; i++){
    array.push({
      id:i,
      text:`할 일 ${i}`,
      checked:false,
    });
  }
  return array;
}

function todoReducer(todos, action){  //useState 대신 useReducer 를 써서 onToggle 과 onRemove 가 계속 새로워지는 문제 해결 가능
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo => 
        todo.id === action.id ? {...todo, checked: !todo.checked} : todo,);
    default : 
      return todos;
  }
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

  //const [todos, setTodos] = useState(createBulkTodos); // 여기에 함수 이름만 적었는데, 함수처럼 () 를 같이 적으면 리렌더링될때마다 이 함수가 호출됨.
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);    //두번째에 원래 초기상태넣어야 하는데 undefined 로 초기화 주면 맨 처음 렌더링할때만 createBulkTodos 로 값 초기화. 

  const nextId = useRef(2501); // id 값은 렌더되지 않으므로 퍼포먼스를 위해 ref 로 만들기
  
  //onInsert 도 리랜더링 될 때마다 새로 함수를 실행하지 않도록 useCallBack 사용
  // const onInsert = useCallback(
  //   text => {
  //     const todo = {
  //       id:nextId.current,
  //       text,
  //       checked:false,
  //     };
  //     setTodos(todos.concat(todo));
  //     nextId.current += 1;
  //   },
  //   [todos],
  // );
  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text,
      checked : false,
    };
    //setTodos(todos => todos.concat(todo));
    dispatch({type:'INSERT', todo});
    nextId.current += 1;
  }, []);    // 위 방식과 다르게 useState의 함수형 업데이트 -> todos 배열이 업데이트되면 이 함수도 같이 바뀌지 않음.


  // const onRemove = useCallback(
  //   id => {
  //     setTodos(todos.filter(todo => todo.id !== id));
  //   },
  //   [todos],
  // );
  const onRemove = useCallback(id => {
    //setTodos(toidos => todos.filter(todo => todo.id !== id));
    dispatch({type:'REMOVE', id});
  },[]);  // 위 방식과 다르게 useState의 함수형 업데이트 -> todos 배열이 업데이트되면 이 함수도 같이 바뀌지 않음.

  
  // const onToggle = useCallback(
  //   id => {
  //     setTodos(
  //       todos.map(todo => 
  //         todo.id === id ? {...todo, checked: !todo.checked} : todo,),
  //     );
  //   },
  //   [todos],
  // );

  const onToggle = useCallback(id => {
    //setTodos( todos => 
      // todos.map(todo =>
      //   todo.id === id ? {...todo, checked: !todo.checked} : todo,
      //   ),
      // );
    dispatch({type:'TOGGLE', id});
  },[]);


  //todos 배열이 바뀌게 되면 onRemove 와 onToggle 함수도 새로 바뀜.
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
