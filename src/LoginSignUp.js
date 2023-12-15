import React, { Fragment, useRef, useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";

const LoginSignUp = () => {
  // isLoading
  const [isLoading, setIsLoading] = useState(false);

  // For Tab Switching
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchToLoginTab = () => {
    switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
    loginTab.current.classList.remove("shiftToLeft");
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleLoginInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://accredian-task.onrender.com/api/v1/login",
        values
      );
      setIsLoading(false);
      const responseData = response.data;

      if (
        responseData.message == "Invalid email!" ||
        responseData.message == "Wrong password!"
      ) {
        // Successful login
        // alert("Either Email Or Password is Wrong");
        toast.error("Either Email Or Password is Wrong!!")
      }
      if (responseData.accessToken) {
        // Successful login
        // alert("Login Successful!!");
        toast.success("Login Successful!!")
      }
    } catch (error) {
      if (error.response) {
        // Invalid credentials or other server response error
        setIsLoading(false);
        toast.error("Invalid credentials. Please check your email and password.");
      } else {
        // Request setup error or network error
        console.error("Error occurred during login:", error.message);
      }
    }
  };

  const [regValues, setRegValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleRegInput = (e) => {
    setRegValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { password, confirmpassword } = regValues;
    if (password !== confirmpassword) {
      // alert("Passwords do not match!");
      toast.error("Passwords do not match!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/register",
          regValues
        );
        setIsLoading(false);
        const responseData = response.data;
        if (responseData.error === "Email already exists!") {
          // alert("User already exists! Please log in or use a different email.");
          toast.error("User already exists! Please log in or use a different email!");
        } else if (responseData.message === "Ok") {
          // alert("Successfully Registered!");
          toast.success("Successfully Registered!");
          switchToLoginTab(); // Switch to the login tab
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error occurred during registration:", error.message);
      }
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <IoMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={handleLoginInput}
              />
            </div>
            <div className="loginPassword">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={handleLoginInput}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <input
              type="submit"
              value={isLoading ? "Wait...." : "Login"}
              className="loginBtn"
              disabled={isLoading}
            />
          </form>

          {/* Signup page */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpEmail">
              <FaUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                onChange={handleRegInput}
              />
            </div>
            <div className="signUpEmail">
              <IoMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                onChange={handleRegInput}
              />
            </div>
            <div className="signUpPassword">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                onChange={handleRegInput}
              />
            </div>
            <div className="signUpPassword">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="confirmpassword"
                onChange={handleRegInput}
              />
            </div>
            <input
              disabled={isLoading}
              type="submit"
              value={isLoading ? "Wait...." : "Register"}
              className="signUpBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;





