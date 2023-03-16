import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { BiSearchAlt } from "react-icons/bi";
import logo from "../Assets/Logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchItem } from "../Redux/Action";
import { useRef } from "react";

export const Header = () => {
  const nav = useRef("navbar");
  const toggleBtn = useRef("toggleBtn");
  let product = useSelector((state) => state);
  let data = product.allProducts.product;
  let dispatch = useDispatch();
  function searchData(e) {
    dispatch(searchItem(e.target.value));
  }
  const openNavbar = () => {
    nav.current.classList.toggle("navActive");
    toggleBtn.current.classList.toggle("toggleBtnActive");
  };

  return (
    <div className="header">
      <div className="headerRow1">
        <div className="headerRow1a">
          <div className="head">
            <div className="logo">
              <img src={logo} alt="LOGO" id="logo" />
            </div>
            <div className="heading">
              <Link
                to="/"
                style={{ textDecoration: "none", color: "aliceblue" }}
              >
                Shopify
              </Link>
            </div>
          </div>
          <div
            className="toggleBtn"
            ref={toggleBtn}
            onClick={() => openNavbar()}
          >
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </div>
        </div>
        <div className="headerRow1b">
          <div className="navbar" ref={nav}>
            {sessionStorage.user ? (
              <>
                <div className="searchBar">
                  <input
                    type="text"
                    placeholder="Search for products"
                    id="search"
                    onChange={(e) => searchData(e)}
                  />
                  <BiSearchAlt
                    size={25}
                    style={{ color: "rgb(167, 26, 162)", width: "35px" }}
                  />
                </div>
                <div className="profile">
                  <Link
                    to="/Profile"
                    className="nav"
                    style={{ textDecoration: "none", color: "aliceblue" }}
                  >
                    {sessionStorage.userPic === undefined ? (
                      <img
                        src={sessionStorage.userPic}
                        alt={sessionStorage.userName}
                        className="profilePic"
                      />
                    ) : (
                      sessionStorage.userName
                    )}
                  </Link>
                </div>

                <div className="cart">
                  <Link
                    to="/Cart"
                    className="nav"
                    style={{ textDecoration: "none", color: "aliceblue" }}
                  >
                    <TiShoppingCart size={50} style={{ color: "aliceblue" }} />
                    {data.length ? (
                      <sup className="cartItem">{data.length}</sup>
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="searchBar">
                  <input
                    type="text"
                    placeholder="Search for products"
                    id="search"
                    onChange={(e) => searchData(e)}
                  />
                  <BiSearchAlt
                    size={25}
                    style={{ color: "rgb(167, 26, 162)", width: "35px" }}
                  />
                </div>
                <div className="login">
                  <Link
                    to="/Login"
                    className="nav"
                    style={{ textDecoration: "none", color: "aliceblue" }}
                  >
                    LogIn
                  </Link>
                </div>
                <div className="signup">
                  <Link
                    to="/Signup"
                    className="nav"
                    style={{ textDecoration: "none", color: "aliceblue" }}
                  >
                    SignUp
                  </Link>
                </div>
                <div className="cart">
                  <Link
                    to="/Cart"
                    className="nav"
                    style={{ textDecoration: "none", color: "aliceblue" }}
                  >
                    <TiShoppingCart size={50} style={{ color: "aliceblue" }} />
                    {data.length ? (
                      <sup className="cartItem">{data.length}</sup>
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="headerRow2">
        <div className="row2searchBar">
          <input
            type="text"
            placeholder="Search for products"
            id="row2Search"
            onChange={(e) => searchData(e)}
          />
          <BiSearchAlt
            size={25}
            style={{ color: "rgb(167, 26, 162)", width: "35px" }}
          />
        </div>
      </div>
    </div>
  );
};
