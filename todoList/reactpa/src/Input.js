import { useState } from "react";

const Input = ({ saveList, emendValue, modify }) => {
  const [name, setname] = useState("");
  const [department, setdepartment] = useState("");
  const [position, setposition] = useState("");

  const clean = () => {
    setname("");
    setdepartment("");
    setposition("");
  };

  return (
    <div>
      이름:
      <input
        type="text"
        value={emendValue.name ? emendValue.name : name}
        onChange={(e) => {
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
