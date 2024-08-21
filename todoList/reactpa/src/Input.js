import { useState } from "react";

const Input = ({ saveList, emendValue, modify }) => {
  const [name, setname] = useState("");
  const [department, setdepartment] = useState("");
  const [position, setposition] = useState("");

  const clean = () => {
    //인풋창 초기화
    setname("");
    setdepartment("");
    setposition("");
  };

  return (
    <div>
      이름:
      <input
        type="text"
        //수정값이 있으면 수정 값을 없으면 일반 값을로 변경
        value={emendValue.name ? emendValue.name : name}
        onChange={(e) => {
          //인풋에 수정 값이 들어 왔으때 입력창이 수정 값으로 고정 안되게하는 if문
          if (emendValue) {
            emendValue.name = e.target.value;
          }
          setname(e.target.value);
        }}
      />
      <br />
      부서:
      <input
        type="text"
        value={emendValue.department ? emendValue.department : department}
        onChange={(e) => {
          if (emendValue) {
            emendValue.department = e.target.value;
          }
          setdepartment(e.target.value);
        }}
      />
      <br />
      직책:
      <input
        type="text"
        value={emendValue.position ? emendValue.position : position}
        onChange={(e) => {
          if (emendValue) {
            emendValue.position = e.target.value;
          }
          setposition(e.target.value);
        }}
      />
      <br />
      <button
        type="button"
        onClick={() => {
          saveList(name, department, position);
          clean();
        }}
      >
        저장
      </button>
      <button
        type="button"
        onClick={() => {
          modify(emendValue);
          clean();
        }}
      >
        수정
      </button>
    </div>
  );
};
export default Input;
