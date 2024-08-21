const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.set("port", 5000);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 데이터 임시 저장 배열
const saramList = [
  { no: 101, name: "박지훈", department: "개발", position: "사원" },
  { no: 102, name: "송민규", department: "보안", position: "인턴" },
  { no: 103, name: "배승환", department: "기획", position: "팀장" },
  { no: 104, name: "명현재", department: "운영", position: "차장" },
  { no: 105, name: "이창준", department: "인사", position: "부장" },
];
let noCnt = 106;

app.get("/todo", (req, res) => {
  // 목록 출력
  res.send(saramList);
});

app.post("/todo", (req, res) => {
  //리스트 추가 함수
  const newsaram = {
    no: noCnt++,
    name: req.body.name,
    department: req.body.department,
    position: req.body.position,
  };
  saramList.push(newsaram);
  res.send(saramList);
});

app.post("/todo/search", (req, res) => {
  //검색값이 있으면 selected 값 보고 새로운 사람 리스트 전송
  //없으면 기존 리스트 전송
  let newsaramList = [];
  if (!req.body.searchValue) {
    res.send(saramList);
  }
  switch (req.body.selected) {
    case "이름":
      newsaramList = saramList.filter(
        (item) => item.name === req.body.searchValue
      );
      break;
    case "부서":
      newsaramList = saramList.filter(
        (item) => item.department === req.body.searchValue
      );
      break;
    case "직책":
      newsaramList = saramList.filter(
        (item) => item.position === req.body.searchValue
      );
      break;
  }
  res.send(newsaramList);
});

app.put("/todo", (req, res) => {
  //리스트 수정
  const idx = saramList.findIndex((item) => {
    return item.no === parseInt(req.body.no);
  });
  if (idx != -1) {
    saramList[idx] = req.body;
  }
  res.send(saramList);
});

app.delete("/todo/", (req, res) => {
  //리스트 삭제
  const idx = saramList.findIndex((item) => {
    return item.no === parseInt(req.body.no);
  });
  if (idx != -1) {
    saramList.splice(idx, 1);
  }
  res.send(saramList);
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 >>> http://localhost:" + app.get("port"));
});
