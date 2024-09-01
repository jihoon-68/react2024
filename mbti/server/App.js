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
app.use(express.static(path.join(__dirname, "../front-end/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
});

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log("서버 실행 중 >>> http://localhost:" + app.get("port"));
});
