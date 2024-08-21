import { useEffect, useState } from "react";
import axios from "axios";
import Input from "./Input";
import Output from "./Output";
import "./App.css";
import Search from "./Search";

const App = () => {
  const serverURL = "http://localhost:5000/todo";
  const [saramlist, setsaramlist] = useState([]);

  const [emendValue, setemendValue] = useState("");
  useEffect(() => {
    //리스트 초기 설정
    axios.get(serverURL).then(function (response) {
      setsaramlist(response["data"]);
    });
  }, []);

  const saveList = (name, department, position) => {
    //추가 함수
    axios
      .post(serverURL, { name, department, position })
      .then(function (response) {
        setsaramlist(response.data);
      });
  };

  const search = (selected, searchValue) => {
    //검색 함수
    console.log(selected, searchValue);
    axios
      .post(serverURL + "/search", { selected, searchValue })
      .then(function (response) {
        setsaramlist(response.data);
      });
  };

  const deleted = (no) => {
    //리스트 삭제 함수
    //리스트 한덩이를 안보내고 no만 보내줌 그레서 no에 {}이거 해줌
    axios.delete(serverURL, { data: { no } }).then(function (response) {
      setsaramlist(response.data);
    });
  };

  const modifyValueCall = (item) => {
    //밑에 표에서 수정 클릭하면 위쪽에 입풋창에 값 전달을 위한 함수
    setemendValue(item);
  };

  const modify = (item) => {
    //인풋 창에 수정버튼 클릭시 리스트 수정 하는 함수
    axios.put(serverURL, item).then(function (response) {
      console.log(response.data);
      setsaramlist(response.data);
    });
    //수정이 끝나고 수정값 비워주기
    setemendValue("");
  };
  return (
    <div>
      <Input saveList={saveList} emendValue={emendValue} modify={modify} />
      <hr />
      <Search search={search} />
      <Output
        saramlist={saramlist}
        deleted={deleted}
        modifyValueCall={modifyValueCall}
      />
    </div>
  );
};

export default App;
