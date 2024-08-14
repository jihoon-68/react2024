import { useState } from "react";
import {BrowserRouter,Routes,Route, Outlet} from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import NoPage from "./pages/NoPage";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Laout from "./pages/Laout";
import Home from "./pages/Home";

const App = ()=>{
    const [photoArr, setPhotoArr] = useState([
        {no:1, img:"images/img_5terre.jpg", title:"5 Terre", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:2, img:"images/img_corniglia.jpg", title:"Monterosso", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:3, img:"images/img_manarola.jpg", title:"Vernazza", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:4, img:"images/img_monterosso.jpg", title:"Manarola", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:5, img:"images/img_riomaggiore.jpg", title:"Corniglia", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
        {no:6, img:"images/img_vernazza.jpg", title:"Riomaggiore", content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
    ]);

    return (<BrowserRouter>
            <Routes>
                <Route path="/" element={<Laout />}>
                    <Route index element={<Home />}/>
                    <Route path="/PhotoList" element={<PhotoList photoArr={photoArr}/>}/>
                    <Route path="/blogs" element={<Blogs/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="*"element={<NoPage/>} />
                </Route>
            </Routes>
            <Outlet/>
    
    </BrowserRouter>);
}

export default App;