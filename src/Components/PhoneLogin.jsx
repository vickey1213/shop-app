import React from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState, useContext } from "react";
import { AuthContext } from "../Firebase/Authorization";

export default function PhoneLogin() {
  let context = useContext(AuthContext);
  let navigate = useNavigate();
  let [mobile, setMobile] = useState("");
  let [OTP, setOTP] = useState("");
  let [flag, setFlag] = useState(false);
  let [confirmObj, setConfirmObj] = useState("");
  let [otpVerify, setOtpVerify] = useState(false);
  let [userName, setUserName] = useState("");

  async function getOTP(e) {
    e.preventDefault();
    if (mobile === "" || mobile === undefined) {
      return console.log("if");
    }
    try {
      let res = await context.PhoneLogin(mobile);
      console.log(res);
      setConfirmObj(res);
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function verifyOTP(e) {
    e.preventDefault();
    console.log(OTP);
    if (OTP === "" || OTP === null) return;
    try {
      await confirmObj.confirm(OTP);
      setOtpVerify(true);
    } catch (error) {
      console.log(error);
    }
  }
  async function verifyUserName(e) {
    e.preventDefault();
    console.log(userName);
    if (userName === "" || userName === null) return;
    try {
      sessionStorage.setItem("user", mobile);
      sessionStorage.setItem("userName", userName);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mainBody">
      <form onSubmit={getOTP}>
        <div className={flag ? "phoneOtpForm" : "phoneLoginForm"} style={{height:"200px"}}>
          <div className="inputdiv">
            <PhoneInput
              defaultCountry="IN"
              placeholder="Enter phone number"
              className="inputNumberTag"
              value={mobile}
              onChange={setMobile}
            />
          </div>
          <div id="recaptcha-container"></div>
          <div
            className="btnSection"
            style={{ justifyContent: "space-evenly" }}
          >
            <button className="loginBtn" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button className="loginBtn">Get OTP</button>
          </div>
        </div>
      </form>
      <>
        <div className={flag ? "phoneLoginForm" : "phoneOtpForm"}>
            {otpVerify?"":(<form onSubmit={verifyOTP}>
            <div className="inputdiv">
              <input
                type="text"
                placeholder="OTP"
                className="inputTag"
                onChange={(e) => setOTP(e.target.value)}
              />
            </div>
            <div className="btnSection">
              <button className="loginBtn">Verify</button>
            </div>
          </form>)}
          
          {otpVerify ? (
            <form onSubmit={verifyUserName}>
              <div className="inputdiv">
                <input
                  type="text"
                  placeholder="Username"
                  className="inputTag"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="btnSection">
                <button className="loginBtn">Confirm</button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </>
    </div>
  );
}
