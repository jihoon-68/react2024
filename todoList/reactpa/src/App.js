import { useState } from "react";
import Input from "./Input";
import Output from "./Output";
import "./App.css";
import Search from "./Search";

const App = () => {
  const [saramlist, setsaramlist] = useState([
    { no: 101, name: "박지훈", department: "개발", position: "사원" },
    { no: 102, name: "송민규", department: "보안", position: "인턴" },
    { no: 103, name: "배승환", department: "기획", position: "팀장" },
    { no: 104, name: "명현재", department: "운영", position: "차장" },
    { no: 105, name: "이창준", department: "인사", position: "부장" },
  ]);
  const [noCnt, setCnt] = useState(106);

  const [emendValue, setemendValue] = useState("");

  const saveList = (name, department, position) => {
    setsaramlist([
      ...saramlist,
      { no: noCnt, name: name, department: department, position: position },
    ]);
    setCnt(noCnt + 1);
  };

  const search = (selected, searchValue) => {
    console.log(selected, searchValue);
  };

  const deleted = (no) => {
    let newsetsaramlist = saramlist.filter((item) => {
      return item.no !== no;
    });
    setsaramlist([...newsetsaramlist]);
  };

  const modifyValueCall = (item) => {
    setemendValue(item);
  };

  const modify = (item) => {
    let idx = saramlist.findIndex((item) => {
      return item.no === emendValue.no;
    });
    if (idx !== -1) {
      saramlist[idx] = item;
      setsaramlist([...saramlist]);
    }
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
