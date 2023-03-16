import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Firebase/Authorization";
import Male from "../Assets/MaleAvatar.png";

export default function Orders() {
  let { logout } = useContext(AuthContext);
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
        </div>
        <div className="profileHeadingContainer">
          <NavLink
            to="/Profile"
            style={{ textDecoration: "none", color: "ActiveBorder" }}
            className="profileHeading"
          >
            <p>My Information</p>
          </NavLink>
          <NavLink
            to="/Address"
            style={{ textDecoration: "none", color: "ActiveBorder" }}
            className="profileHeading"
          >
            <p>My Addresses</p>
          </NavLink>
          <NavLink
            to="/Wishlist"
            style={{ textDecoration: "none", color: "ActiveBorder" }}
            className="profileHeading"
          >
            <p>My Wishlist</p>
          </NavLink>
          <NavLink
            to="/Orders"
            style={{ textDecoration: "none", color: "ActiveBorder" }}
            className="profileHeading"
          >
            <p>My Orders</p>
          </NavLink>
          <NavLink
            to="/"
            style={{ textDecoration: "none", color: "ActiveBorder" }}
            className="profileHeading"
            onClick={logout}
          >
            <p>Logout</p>
          </NavLink>
        </div>
      </div>
      <div className="profileContents">
        <div className="d3 Top">My Orders</div>
        <div className="d3 Right">My Orders</div>
        <div className="d3 Bottom">My Orders</div>
        <div className="d3 Left">My Orders</div>
        <div className="d3 Up"></div>
        <div className="d3 Down">My Orders</div>
      </div>
    </div>
  );
}
