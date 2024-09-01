import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ signup }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");

  const handling = (signupCk) => {
    console.log(signupCk);
    if (signupCk) {
      navigate("/");
    }
  };

  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <span>아이디</span>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      <br />
      <span>비밀번호</span>
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <span>이름</span>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <br />
      <span>이메일</span>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <br />
      <button
        onClick={async () => {
          const signupck = await signup(id, password, name, email);
          handling(signupck);
        }}
      >
        화원가입
      </button>
    </div>
  );
};
export default Signup;
