import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./component/menu";
import Login from "./component/login";
import Signup from "./component/signup";
import Home from "./component/Home";
const App = () => {
  const serverURL = "http://localhost:5000/todo";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
