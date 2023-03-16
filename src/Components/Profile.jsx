import React, { useContext } from "react";
import { AuthContext } from "../Firebase/Authorization";
import Male from "../Assets/MaleAvatar.png";
import { NavLink} from "react-router-dom";
import { useRef } from "react";

export default function Profile() {
  const profileNav=useRef('profileHeadingContainer')
  let { logout } = useContext(AuthContext);
  const openNavbar = () => {
    console.log("clicked");
    profileNav.current.classList.toggle("navActive");
  };
  return (
    <div className="profileData">
      <div className="profileHeadings">
        <div className="profileName">
          <img
            src={Male}
            alt="pic"
            width={80}
            style={{ borderRadius: "100%", border: "2px solid grey" }}
          />
          <div>
            <p style={{ fontSize: "13px" }}>Hello,</p>
            <p style={{ fontSize: "20px" }}>{sessionStorage.userName}</p>
          </div>
          <div className="toggleBtnProfileNav" onClick={() => openNavbar()}>
            <span className="profileNavBar"></span>
            <span className="profileNavBar"></span>
            <span className="profileNavBar"></span>
          </div>
        </div>
        <div className="profileHeadingContainer" ref={profileNav}>
          <NavLink to="/Profile" style={{ textDecoration: "none",color:"ActiveBorder" }} className="profileHeading"><p>My Information</p></NavLink>
          <NavLink to="/Address"style={{ textDecoration: "none",color:"ActiveBorder" }} className="profileHeading"><p>My Addresses</p></NavLink>
          <NavLink to="/Wishlist" style={{ textDecoration: "none",color:"ActiveBorder" }} className="profileHeading">
            <p>My Wishlist</p>
          </NavLink>
          <NavLink to="/Orders"style={{ textDecoration: "none",color:"ActiveBorder" }} className="profileHeading"><p>My Orders</p></NavLink>
          <NavLink to="/"style={{ textDecoration: "none",color:"ActiveBorder" }} className="profileHeading" onClick={logout}>
            <p>Logout</p>
          </NavLink>
        </div>
      </div>
      <div className="profileContents">
        
        <div className="d3 Top">My Information</div>
        <div className="d3 Right">My Information</div>
        <div className="d3 Bottom">My Information</div>
        <div className="d3 Left">My Information</div>
        <div className="d3 Up"></div>
        <div className="d3 Down">My Information</div>
      </div>
    </div>
  );
}
