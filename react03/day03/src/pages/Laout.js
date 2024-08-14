import { Link, Outlet } from "react-router-dom"
export default () =>{
    return(<div>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/PhotoList">PhotoList</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/contact">Contact</Link>
            <Link to="*">*</Link>
        </nav>
        <Outlet/>
    </div>)
}