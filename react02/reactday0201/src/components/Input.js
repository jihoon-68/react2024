import React from "react";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ appendItem, emendText }) => {
  // 구조분해 할당 기호: 배열은 [], 객체는 {}

  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="input-group mb-3">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        type="text"
        className="form-control"
        placeholder="할 일 추가"
      />
      <div className="input-group-append">
        <button
          onClick={() => {
            appendItem(inputValue);
            setInputValue("");
          }}
          className="btn btn-primary"
          type="button"
        >
          OK
        </button>
        <button
          //버튼 누르면 todo title 변경하는 함수에 inputValue전달
          onClick={() => emendText(inputValue)}
          className="btn btn-primary"
          type="button"
        >
          emend
        </button>
        <button className="btn btn-danger" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};
