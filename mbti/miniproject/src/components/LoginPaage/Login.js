import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="loging-page">
      <input
        type="text"
        value={userId}
        onChange={(e) => {
          setuserId(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        value={userPassword}
        onChange={(e) => {
          setuserPassword(e.target.value);
        }}
      />
      <br />
      <button
        type="button"
        onClick={async () => {
          const loginCk = await login(userId, userPassword);
          handling(loginCk);
        }}
      >
        로그인
      </button>
      <br />
      <Link to="/signup">회원가입</Link>
    </div>
  );
};
export default Login;
