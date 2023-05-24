import React, { Component, useState } from 'react'
import { auth, logInWithEmailAndPassword } from "../firebase/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login({ setUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [verified, setverified] = useState(false)
  const navigate = useNavigate();



  function onChange(value) {
    console.log("Captcha value:", value);
    setverified(true)
  }
  return (
    <form>
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </div>
      {/* 
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */}
      <div className="mb-3">
        <ReCAPTCHA
          sitekey="6LehhzUmAAAAAOUtHbRqDlwER2FiqZkE7RkbMGVe"
          onChange={onChange}
        />
      </div>

      <div className="d-grid">
        <input type="submit" className="btn btn-primary" onClick={async (e) => {
          e.preventDefault();
          const res = await logInWithEmailAndPassword(email, password)
          console.log("res", res);



          // setUserData({
          //   name: res.user.displayName,
          //   email: res.user.email,
          //   emailVerified: res.user.emailVerified
          // })

          navigate("/dashboard")

        }} disabled={!verified} value={"  Submit"} />

      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  )
}

