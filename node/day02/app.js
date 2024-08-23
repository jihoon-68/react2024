const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const multer = require('multer');
const fs = require('fs');

app.set("port", 3000);
app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));
// POST 방식으로 파라미터 전달 받기 위한 설정
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 쿠키 사용 미들웨어 설정
app.use(cookieParser());
// 세션 미들웨어 등록
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

// multer 업로드 설정
// multer 미들웨어 사용: 미들웨어 사용 순서 
// body-parser -> multer -> router 순으로 실행
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, 'uploads');
  },
  filename: function (req, file, callback) {
      //callback(null, file.originalname + Date.now());
      // 파일명 중복을 방지하기 위한 처리
      // Date.now() <-- 타임스템프
      const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
      let index = fileName.lastIndexOf(".");
      let newFileName = fileName.substring(0, index);
      newFileName += Date.now();
      newFileName += fileName.substring(index);
      callback(null, newFileName);
  }
});
// 파일 제한: 10개, 1G 이하
var upload = multer({
  storage: storage,
  limits: {
      files: 10,
      fileSize: 1024 * 1024 * 1024
  }
});



// 임시 데이터
const memberList = [
  {
    no: 101,
    id: "user01",
    password: "1234",
    name: "홍길동",
    email: "hong@gmail.com",
  },
  {
    no: 102,
    id: "user02",
    password: "12345",
    name: "김길동",
    email: "kim@gmail.com",
  },
  {
    no: 103,
    id: "user03",
    password: "123",
    name: "박길동",
    email: "lee@gmail.com",
  },
  {
    no: 104,
    id: "user04",
    password: "123456",
    name: "이길동",
    email: "park@gmail.com",
  },
];
let noCnt = 105;

// 쇼핑몰 상품 목록
const carList = [
  { 
    _id:111, 
    name:'SM5', 
    price:3000, 
    year:1999, 
    company:'SAMSUNG',
    writedate: "",
    photos: [
        { 
            originalname: "르노삼성sm520.png", 
            filename: "르노삼성sm520.png",
            filesize: 371000,
            mimetype: "img/png"
        },{ 
            originalname: "르노삼성sm5.png", 
            filename: "르노삼성sm5.png",
            filesize: 95900,
            mimetype: "img/png"
        }
    ]

  }
  
];
const cartList = [];
let carSeq = 117;

// 요청 라운팅 사용
const router = express.Router();

router.route("/home").get((req, res) => {
  req.app.render("home/Home", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/profile").get((req, res) => {
  req.app.render("profile/Profile", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/member").get((req, res) => {
  // 로그인이 되어 있다면 member 페이지를 보여준다.
  // 쿠키는 사용자쪽에 전달(res), 세션은 요청 들어올때 생성(req)
  if (req.session.user !== undefined) {
    const user = req.session.user;
    req.app.render("member/Member", { user }, (err, html) => {
      res.end(html);
    });
  } else {
    res.redirect("/login");
  }
});
router.route("/login").get((req, res) => {
  req.app.render("member/Login", {}, (err, html) => {
    // 사용자(접속자)의 로컬에 쿠키가 저장 된다.
    res.cookie("user", {
      id: "TestUser",
      name: "테스트 유저",
      authorized: true,
    });
    res.end(html);
  });
});
router.route("/login").post((req, res) => {
  console.log(req.body.id, req.body.password);
  const idx = memberList.findIndex((member) => member.id === req.body.id);
  if (idx != -1) {
    if (memberList[idx].password === req.body.password) {
      console.log("로그인 성공!");
      // 세션에 로그인 정보를 등록 후 멤버 페이지 이동
      req.session.user = {
        id: req.body.id,
        name: memberList[idx].name,
        email: memberList[idx].email,
        no: memberList[idx].no,
      };
      res.redirect("/member");
    } else {
      console.log("로그인 실패! 패스워드가 맞지 않습니다.");
      // 다시 로그인 페이지로 다시 이동
      res.redirect("/login");
    }
  } else {
    console.log("존재하지 않는 계정입니다.");
    res.redirect("/login");
  }
});
router.route("/logout").get((req, res) => {
  console.log("GET - /logout 호출 ...");
  // 로그인 된 상태라면 로그아웃
  if (!req.session.user) {
    console.log("아직 로그인 전 상태입니다.");
    res.redirect("/login");
    return;
  }
  // 세션의 user 정보를 제거 해서 logout처리
  req.session.destroy((err) => {
    if (err) throw err;
    console.log("로그아웃 성공!");
    res.redirect("/login");
  });
});
router.route("/joinus").get((req, res) => {
  // 회원 가입 ejs 페이지 forward
  req.app.render("member/Joinus", {}, (err, html) => {
    res.end(html);
  });
});
router.route("/joinus").post((req, res) => {
  // 회원 가입 처리 후 목록으로 갱신
  res.redirect("/member");
});
router.route("/gallery").get((req, res) => {
  req.app.render("gallery/Gallery", {}, (err, html) => {
    res.end(html);
  });
});
// ---- 쇼핑몰 기능
router.route("/shop").get((req, res) => {
  req.app.render("shop/Shop", { carList }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
router.route("/shop/insert").get((req, res) => {
  req.app.render("shop/Insert", {}, (err, html) => {
    res.end(html);
  });
});

router.route("/shop/insert").post(upload.any('photo',1),(req, res) => {
  //제품 추가 요청 처리하는 곳
  //가격과 연식은 수자로 변화후 등록
  const {name,price,year,company} = req.body
  const itemFiles = req.files;
  let intprice = parseInt(price);
  let intyear = parseInt(year);
  //console.dir(itemFiles)
  const newCar={
    _id:carSeq,name,price:intprice,year:intyear,company,
    writedate: Date.now(),
    photos:itemFiles
  }
  console.dir(newCar);
  carList.push(newCar);
  res.redirect("/shop");
  res.end();

});

router.route("/shop/modify").get((req, res) => {
  const _id = parseInt(req.query._id);
  const idx = carList.findIndex((car) => _id === car._id);
  if (idx === -1) {
    console.log("상품이 존재 하지 않습니다.");
    res.redirect("/shop");
    return;
  }
  req.app.render("shop/Modify", { car: carList[idx] }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
router.route("/shop/modify").post((req, res) => {
  const _id = parseInt(req.body._id);
  const idx = carList.findIndex((car) => _id === car._id);
  console.log("POST - /shop/modify 호출");
  if (idx === -1) {
    console.log("수정 완료하는데 오류가 발생 했습니다");
    res.redirect("/shop");
    return;
  }
  //인풋 타입을 숫자로 정해도 넘어올때는 문자로 넘어 왔어
  //-id,가격,연식을 숫자로 변환후 등록
  carList[idx] = req.body;
  carList[idx]._id = _id;
  carList[idx].price = parseInt(req.body.price);
  carList[idx].year = parseInt(req.body.year);
  console.log(carList);
  res.redirect("/shop");
});
router.route("/shop/detail").get((req, res) => {
  // 쿼리로 전송된 데이터는 모두 문자열이다.
  // parseInt() 필수 "56" <-- numeric
  const _id = parseInt(req.query._id);
  console.log(_id);
  const idx = carList.findIndex((car) => _id === car._id);
  console.log(idx);
  if (idx === -1) {
    console.log("상품이 존재 하지 않습니다.");
    res.redirect("/shop");
    return;
  }
  req.app.render("shop/Detail", { car: carList[idx] }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
router.route("/shop/delete").get((req, res) => {
  const _id = parseInt(req.query._id);
  const idx = carList.findIndex((car) => _id === car._id);
  //받아 오는 쿼리에 reply가 있으면 제품삭제나 취소를 클릭 한것이고
  //없으면 그냥 삭제 페이지 출력
  if (req.query.reply) {
    // 삭제 클릭하면 퀘에 있는 id 값을로 제품 삭제후 쇼핑홈으로
    if (req.query.reply === "yes") {
      console.log("삭제 완료");
      carList.splice(idx, 1);
      res.redirect("/shop");
      return;
    }
    // 취소 클릭하면 그냥 쇼핑 홈으로 이동
    console.log("삭제 취소");
    res.redirect("/shop");
    return;
  }

  req.app.render("shop/Delete", { car: carList[idx] }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});
router.route("/shop/cart").get((req, res) => {
  //장바구니 제품 출력
  req.app.render("shop/Cart", { cartList }, (err, html) => {
    if (err) throw err;
    res.end(html);
  });
});

router.route("/shop/delete/cart").get((req, res) => {
  //상세페이지에 들어 가서 장바구에 담는 방식으로 함
  const _id = parseInt(req.query._id);
  const idx = carList.findIndex((car) => _id === car._id);
  //혹시나 답기를 눌렀을때 그제품이 없어 졌으면 콘솔 출력후 쇼핑홈으로
  if (idx === -1) {
    console.log("장바구니에 담기 오류");
    res.redirect("/shop");
    return;
  }
  //아니면 장바구니 리스트에 선택한 제품 넣기
  cartList.push(carList[idx]);
  console.log(cartList);
  res.redirect("/shop/cart");
});

// router 설정 맨 아래에 미들웨어 등록
app.use("/", router);

// 등록되지 않은 패스에 대해 페이지 오류 응답
// app.all('*', function(req, res) {
//     res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>')
// });

const expressErrorHandler = require("express-error-handler");
const { QueryCompositeFilterConstraint } = require("firebase/firestore/lite");
const { time } = require("console");
//모든 라우터 처리 후 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버 생성 및 실행
const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`Run on server >>> http://localhost:${app.get("port")}`);
});
