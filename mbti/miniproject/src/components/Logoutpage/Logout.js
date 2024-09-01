import { useNavigate } from "react-router-dom";
const Logout = ({ logout }) => {
  const navigate = useNavigate();
  const logoutUrl = () => {
    logout();
    navigate("/");
  };
  logoutUrl();
  return <></>;
};

export default Logout;
