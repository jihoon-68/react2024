const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);

app.set("port", 5000);
app.use(cors());
app.use(express.static(path.join(__dirname, "./front-end/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const questions = [
  { text: "당신은 새로운 아이디어를 실험하는 것을 좋아하나요?", type: "EI" },
  { text: "당신은 사람들과의 대화에서 에너지를 얻나요?", type: "EI" },
  { text: "당신은 주어진 사실과 정보에 기반해 결정을 내리나요?", type: "SN" },
  {
    text: "당신은 전체적인 그림보다는 세부 사항에 중점을 두나요?",
    type: "SN",
  },
  { text: "당신은 감정에 기반하여 결정을 내리나요?", type: "TF" },
  { text: "당신은 논리적이고 분석적인 접근을 선호하나요?", type: "TF" },
  { text: "당신은 즉흥적으로 행동하는 것을 좋아하나요?", type: "JP" },
  { text: "당신은 계획적이고 체계적인 접근을 선호하나요?", type: "JP" },
];
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./front-end/build/index.html"));
});
app.get("/date", (req, res) => {
  res.send(questions);
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 >>> http://localhost:" + app.get("port"));
});
