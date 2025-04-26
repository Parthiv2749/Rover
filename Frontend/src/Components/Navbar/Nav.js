
import logo from "../../resource/images/Logo.jpeg";
import "./Nav.css";

import { Link, Outlet } from "react-router-dom";

function Nav(){
    return(
        <>
            <nav id="navbar">
                <img src={logo} alt="logo"></img>
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/">ABOUT US</Link></li>
                    <li><Link to="/">ROVER</Link></li>
                    <li><Link to="/LiveFeed">LIVE</Link></li>
                    {/* <!-- <li><a href="#">Contact</a></li> --> */}
                    <li><Link to="/Login">LOGIN</Link></li>
                </ul>
            </nav>
            <Outlet/>            
        </>
    );
}

export default Nav;