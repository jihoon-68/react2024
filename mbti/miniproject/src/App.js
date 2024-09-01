import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import TeamPage from "./components/TeamPage/TeamPage";
import MBTIPage from "./components/MBTIPage/MBTIPage";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/LoginPaage/Login";
import Signup from "./components/SignupPaage/Signup";
import Logout from "./components/Logoutpage/Logout";
import "./App.css";
import axios from "axios";

function App() {
  //이거 엑시오스로 받아오기
  const serverUrl = "http://localhost:5000/";
  const [questions, setquestions] = useState();
  const [checkIn, setcheckIn] = useState(false);

  useEffect(() => {
    axios.get(serverUrl + "date").then(function (response) {
      setquestions(response.data);
    });
  }, []);

  const login = async (id, password) => {
    try {
      const response = await axios.post(serverUrl + "loginBtn", {
        id,
        password,
      });
      const isAuthenticated = response.data;

      if (isAuthenticated) {
        setcheckIn(isAuthenticated);
        return isAuthenticated;
      } else {
        alert("아이디/비밀번호가 틀렸습니다.");
        return isAuthenticated;
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인 중 오류가 발생했습니다.");
      return false;
    }
  };

  const signup = async (id, password, name, email) => {
    try {
      const response = await axios.post(serverUrl + "signupBtn", {
        id,
        password,
        name,
        email,
      });
      const isAuthenticated = response.data;

      if (isAuthenticated) {
        return isAuthenticated;
      } else {
        alert("아이디/비밀번호가 틀렸습니다.");
        return isAuthenticated;
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("회원가입 중 오류가 발생했습니다.");
      return false;
    }
  };
  const logout = () => {
    try {
      if (checkIn) {
        axios.get(serverUrl + "logout");
        setcheckIn(!checkIn);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar checkIn={checkIn} />}>
          <Route index element={<MainPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/mbti" element={<MBTIPage questions={questions} />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/logout" element={<Logout logout={logout} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
