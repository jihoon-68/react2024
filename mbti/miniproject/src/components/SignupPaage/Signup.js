import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ signup }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handling = (signupCk) => {
    console.log(signupCk);
    if (signupCk) {
      navigate("/");
    }
  };

  return (
    <div className="main-page">
      <h1>"baesh에서 새롭게 태어나보세요."</h1>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <button
        onClick={async () => {
          const signupCk = await signup(id, password, name, email);
          handling(signupCk);
        }}
      >
        회원가입
      </button>
    </div>
  );
};
export default Signup;
