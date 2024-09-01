import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import TeamPage from "./components/TeamPage/TeamPage";
import MBTIPage from "./components/MBTIPage/MBTIPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/LoginPaage/Login";
import "./App.css";

function App() {
  //이거 엑시오스로 받아오기
  const [questions, setquestions] = useState([
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
    // 추가 문항을 여기에 추가하세요
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/mbti" element={<MBTIPage questions={questions} />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
