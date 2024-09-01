const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);

app.set("port", 5000);
app.use(cors());
app.use(express.static(path.join(__dirname, "./front-end/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(
  expressSession({ secret: "my key", resave: true, saveUninitialized: true })
);
const user = [
  { id: "1", password: "1", email: "123@naver.com", name: "박지훈" },
];
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
app.get("/login", (req, res) => {});

app.post("/loginBtn", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  console.log(id, password);

  const idCk = user.findIndex((item) => item.id === id);
  console.log(idCk);
  try {
    if (idCk !== -1) {
      if (password === user[idCk].password) {
        req.session.user = {
          id: user[idCk].id,
          name: user[idCk].name,
          email: user[idCk].email,
        };
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

app.post("/signupBtn", (req, res) => {
  console.log(req.body);
  try {
    const item = req.body;
    user.push(item);
    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
  console.log(user);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    console.log("로그아웃 성공!");
  });
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 >>> http://localhost:" + app.get("port"));
});
