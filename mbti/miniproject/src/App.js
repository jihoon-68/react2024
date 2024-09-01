import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import TeamPage from "./components/TeamPage/TeamPage";
import MBTIPage from "./components/MBTIPage/MBTIPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/LoginPaage/Login";
import "./App.css";
import axios from "axios";

function App() {
  //이거 엑시오스로 받아오기
  const serverUrl = "http://localhost:5000/";
  const [questions, setquestions] = useState();
  useEffect(() => {
    axios.get(serverUrl + "date").then(function (response) {
      setquestions(response.data);
    });
  });
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
