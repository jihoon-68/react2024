import {Link,Outlet} from "react-router-dom";
const Menu = () => {
  return(<div>
    <Link to="/">Home</Link>
    <Link to="login"></Link>
  </div>) ;
};
export default Menu();
