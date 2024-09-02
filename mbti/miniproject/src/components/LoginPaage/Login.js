import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const logoUrl = "../../images/logo2.png";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("");

  const handling = (loginCk) => {
    console.log(loginCk);
    if (loginCk) {
      navigate("/");
    }
  };

  return (
    <div className="loging-page-container">
      <div className="loging-page">
        {/* 로고 이미지 */}
        <img src={logoUrl} alt="Logo" className="logo" />
        {/* 애니메이션 텍스트 */}
        <h1 className="welcome-text">환영합니다</h1>
        <input
          type="text"
          value={userId}
          onChange={(e) => {
            setuserId(e.target.value);
          }}
          placeholder="아이디"
        />
        <br />
        <input
          type="password"
          value={userPassword}
          onChange={(e) => {
            setuserPassword(e.target.value);
          }}
          placeholder="패스워드"
        />
        <br />
        <div className="button-container">
          <button
            type="button"
            onClick={async () => {
              const loginCk = await login(userId, userPassword);
              handling(loginCk);
            }}
          >
            로그인
          </button>
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
