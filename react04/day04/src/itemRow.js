import { useState } from "react";

export default ({ item, onDelete, onChangeCkb, oneModify }) => {
  //console.log("itemRow페이지 td생성");
  const [flag, setFlag] = useState(false);
  const [savemodifyInput, setsavemodifyInput] = useState("");
  const [modifyInput, setmodifyInput] = useState(item.title);
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <input
            type="checkbox"
            defaultChecked={item.done ? "checked" : ""}
            onClick={() => {
              onChangeCkb(item.no);
            }}
          />
        </div>
      </div>
      <input
        type="text"
        className="form-control"
        readOnly={flag ? "" : "readOnly"}
        value={modifyInput}
        style={{ textDecoration: item.done ? "line-through" : "" }}
        onChange={(e) => {
          setmodifyInput(e.target.value);
          //console.log("input");
        }}
        onFocus={() => {
          setFlag(true);
          //console.log("FocussetFlag");
        }}
        onBlur={() => {
          setFlag(false);
          //console.log("setFlag");
          //일단수정 버튼 누르기 전까지 입력한값 저장하기
          setsavemodifyInput(modifyInput);
          //console.log("setsavemodifyInput");
          //다른 리스트를 클릭하면 기존에 있던 값을로 수정
          setmodifyInput(item.title);
          //console.log("setmodifyInput");
        }}
      />
      <div className="input-group-append">
        <button
          onClick={() => {
            //수정하는 함수에 매개 변수로 item.no와 수정값을 갖고 있는 savemodifyInput로 준다
            //modifyInput로 매개변수를 주지 않은 이유는 위 input에 onBlur 이벤트 때문에
            //다른 데를 클릭하면 자동으로 modifyInput 값은 기존의 리스트에 있는 값을로 변경되기 때문이다
            oneModify(item.no, savemodifyInput);
            //console.log("App로이동");

            setmodifyInput(savemodifyInput);
            //console.log("setmodifyInput");
          }}
          className="btn btn-primary"
          type="button"
        >
          수정
        </button>
        <button
          onClick={() => {
            onDelete(item.no);
          }}
          className="btn btn-danger"
          type="button"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
