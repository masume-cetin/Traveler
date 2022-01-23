import React from "react";
import sketch from "../../sketch";
import { ReactP5Wrapper } from 'react-p5-wrapper';
import './Header.css';
import Profile from "../Profile";
import {Link} from 'react-router-dom';
import Location from "../Location";
import bootstrap from "bootstrap";

function Header(){

    function logout(){
        localStorage.removeItem("userToken")
    }

return(

    <section className="header" >
    <section className="header-top">
        <section className="header-top-logo">
        <ReactP5Wrapper sketch={sketch}/>
        </section>        
        <section className="header-top-navbar">
        </section>
    </section>
    <section className="header-bottom">
        <section className="location"><Link className="link" to="/Location">Location</Link></section>
        <section className="profile"><Link className="link" to="/Profile">Profile</Link></section>
        <section className="profile"><Link className="link" to="/MainFeedPage">Feed</Link></section>
        <section onClick={logout} className="signout"><Link className="link" to="/">SignOut</Link></section>
    </section>

  </section>

);

}

export default Header;