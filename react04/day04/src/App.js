import "./App.css";
import { useState } from "react";
import ItemRow from "./itemRow";

const App = () => {
  console.log("App페이지");
  // 전역변수를 state로 만들어 주어야 re rendering 된다.
  // 구조분해 할당 = state변수, setter함수
  const [name, setName] = useState("Todo List");
  const [input, setINput] = useState("Todo List");
  const [todoList, setTodoLilst] = useState([
    { no: 101, title: "공부하기", done: false },
    { no: 102, title: "자바하기", done: true },
    { no: 103, title: "리액트하기", done: false },
    { no: 104, title: "스프링하기", done: false },
  ]);
  const [noCnt, setNoCnt] = useState(105);
  const onClickEvent = () => {
    // 기존 내용에 새 내용을 추가 해서 새 배열을 생성
    setTodoLilst([...todoList, { no: noCnt, title: input, done: false }]);
    setNoCnt(noCnt + 1);
    setINput("");
  };
  const onchangeTitle = (e) => {
    setINput(e.target.value);
  };

  const onDelete = (e) => {
    setTodoLilst(todoList.filter((item) => item.no !== e));
  };

  const onChangeCkb = (e) => {
    let idx = todoList.findIndex((item) => item.no === e);
    let newtodoList = [...todoList];
    newtodoList[idx].done = !newtodoList[idx].done;
    setTodoLilst(newtodoList);
  };

  const oneModify = (no, Input) => {
    let idx = todoList.findIndex((item) => item.no === no);
    let newtodoList = [...todoList];
    newtodoList[idx].title = Input;
    setTodoLilst(newtodoList);
  };
  return (
    <div className="todoList">
      <div className="App-header">
        <h1>{name} App</h1>
      </div>
      <div className="input-title">
        <div className="container" style={{ padding: "10px" }}>
          <div className="input-group mb-3">
            <input
              value={input}
              onChange={onchangeTitle}
              type="text"
              className="form-control"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-success" onClick={onClickEvent}>
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="list-body">
        <div className="container">
          <table className="table table-hover">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Done</th>
                <th>Title</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((item) => {
                return (
                  <tr key={item.no}>
                    <td colSpan={3} style={{ padding: "0px" }}>
                      <ItemRow
                        item={item}
                        onDelete={onDelete}
                        oneModify={oneModify}
                        onChangeCkb={onChangeCkb}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul></ul>
        </div>
      </div>
    </div>
  );
};

export default App;
