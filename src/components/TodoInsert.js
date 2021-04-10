import React, { useState, useCallback }from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {

  const [value, setValue] = useState('');

  const onChange = useCallback(e=>{  //컴포넌트가 리랜더링될때마다 함수를 새로만들지 않음.
    setValue(e.target.value);
  },[]);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');
      e.preventDefault();
    },
    [onInsert, value],
  )

  return(
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input 
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;