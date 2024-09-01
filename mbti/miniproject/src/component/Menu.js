import { Link, Outlet } from "react-router-dom";
const Menu = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="login"></Link>
        <Link to="Signup"></Link>
      </nav>
      <Outlet />
    </div>
  );
};
export default Menu();
