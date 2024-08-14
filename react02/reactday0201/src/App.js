import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Output from "./components/Output";

const App = () => {
  // useState() 훅을 이용해서 state 생성
  // Input 컴포넌트에서 데이터를 추가 하고
  // Ouput 컴포넌트에서 데이터를 접근 할 수 있다.
  const [todoListArr, setTodoList] = React.useState([
    { no: 101, title: "운동하기", done: false },
    { no: 102, title: "운동하기2", done: false },
    { no: 103, title: "운동하기3", done: false },
  ]);
  const [noCnt, setNoCnt] = React.useState(104);
  const [EmendItem, setEmendItem] = React.useState("");

  function appendItem(title) {
    // setTodoList 함수를 이용해서 데이터 갱신
    // 스프리드 연산자 사용하면 편리함.
    const newItem = { no: noCnt, title: title, done: false };
    setNoCnt(noCnt + 1);
    setTodoList([...todoListArr, newItem]);
  }

  //todo no 들고 왔어 필터로 no만 걸러낸뒤 저장
  function deleteItem(e) {
    console.log(e);
    setTodoList(todoListArr.filter((todo) => todo.no !== e));
  }

  //수정할 todo no 불러 왔어 State에 저장후
  //emendText함수에서 todoListArr인덱스로 사용됨
  function emendItemNo(no) {
    let idx = todoListArr.findIndex((todo) => {
      return todo.no === no;
    });
    setEmendItem(idx);
  }

  function emendText(title) {
    console.log(title);

    //새로 배열 만들고 저장하면 바로 변경됨
    let newArr = [...todoListArr];
    newArr[EmendItem].title = title;

    //기존에있는 배열에다가 title을 변경해도 바라 변경 안됨
    //메모리가 같아서 바로는 인식을 못하는 것이라고 생각한다
    //todoListArr[EmendItem].title = title;
    setTodoList(newArr);
    console.log(todoListArr);
  }

  //체크 박스 값 변경
  function changeCkBox(change, no) {
    let idx = todoListArr.findIndex((todo) => {
      return todo.no === no;
    });
    let newdone = [...todoListArr];
    newdone[idx].done = !newdone[idx].done;
    setTodoList(newdone);
    console.log(todoListArr);
  }

  return (
    <div>
      <header className="jumbotron">
        <h1>Todo List</h1>
        <p>오늘 할 일을 입력 하세요</p>
      </header>
      {/* 입력 기능 */}
      <Input appendItem={appendItem} emendText={emendText} />
      {/* 목록 출력 기능 - 추가된 속성은 props로 전달. */}
      <Output
        todoListArr={todoListArr}
        deleteItem={deleteItem}
        emendItemNo={emendItemNo}
        changeCkBox={changeCkBox}
      />
    </div>
  );
};

export default App;
