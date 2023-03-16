import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleButton } from "react-google-button";
import { AuthContext } from "../Firebase/Authorization";

export default function Signup() {
  let context = useContext(AuthContext);
  let navigate = useNavigate();
  let [userName, setUserName] = useState();
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [confirmPassword, setConfirmPassword] = useState();
  async function signUpData(e) {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password Should Match");
      } else {
        let data = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
          userName
        );
        toast.success("Signup Successfully");
        toast.warning(
          `Please verify your email address link sended to ${email}`
        );
        let user = data.user;
        updateProfile(user, { displayName: userName });
        console.log(user);
        sendEmailVerification(user);
        navigate("/LogIn");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function loginGoogle(e) {
    e.preventDefault();
    try {
      console.log("try");
      await context.GoogleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={signUpData}>
      <div className="mainBodyForm">
        <div className="signupForm">
          <div className="inputdiv">
            <input
              type="text"
              placeholder="Username"
              className="inputTag"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
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
              required
            />
          </div>
          <div className="inputdiv">
            <input
              type="password"
              placeholder="Confirm Password"
              className="inputTag"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="btnSection">
            <button className="loginBtn">Submit</button>
          </div>
          {/* <div className="inputdiv">
            <GoogleButton onClick={(e) => loginGoogle(e)} />
          </div> */}
          {/* <div className="inputdiv">
            <button
              className="loginBtn"
              onClick={() => navigate("/PhoneLogin")}
            >
              Signup with Phone Number
            </button>
          </div> */}
          <div className="btnSection">
            <button className="loginBtn" onClick={() => navigate("/Login")}>
              Existing User? Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
