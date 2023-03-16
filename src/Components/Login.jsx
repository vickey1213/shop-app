import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleButton } from "react-google-button";
import { AuthContext } from "../Firebase/Authorization";

export default function Login() {
  let context = useContext(AuthContext);
  let navigate = useNavigate();
  let [password, setPassword] = useState();
  let [email, setEmail] = useState();
  async function loginGoogle(e) {
    e.preventDefault();
    try {
      await context.GoogleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  async function logInData(e) {
    e.preventDefault();
    try {
      let userData = await signInWithEmailAndPassword(auth, email, password);
      console.log(userData);
      if (userData.user.emailVerified === true) {
        signInWithEmailAndPassword(auth, email, password);
        toast.success(`Logged in as ${email}`);
        navigate("/");
        window.location.reload();
      } else {
        toast.error(`Please verify your email address ${userData.user.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email Id and password doesn't match");
    }
  }
  return (
    <form onSubmit={logInData}>
      <div className="mainBodyForm">
        <div className="loginForm">
          <div className="inputdiv">
            <input
              type="email"
              placeholder="Email"
              className="inputTag"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputdiv">
            <input
              type="password"
              placeholder="Password"
              className="inputTag"
              onChange={(e) => setPassword(e.target.value)}
              re
            />
          </div>
          <div className="btnSection">
            <button className="loginBtn">Submit</button>
          </div>
          {/* <div className="inputdiv">
            <GoogleButton onClick={(e) => loginGoogle(e)} />
          </div>
          <div className="inputdiv">
            <button
              className="loginBtn"
              onClick={() => navigate("/PhoneLogin")}
            >
              Login with Phone Number
            </button>
          </div> */}
          <div className="btnSection">
            <button className="loginBtn" onClick={() => navigate("/Signup")}>
              New User? Create an account
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
