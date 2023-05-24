import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, useHistory } from "react-router-dom";
import {
  auth,
  logout,
  registerWithEmailAndPassword
} from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';
import PasswordChecklist from "react-password-checklist"


export default function Register({ setUserData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [verified, setverified] = useState(false)

  const register = async (e) => {
    e.preventDefault();
    if (!name) alert("Please enter name");
    await registerWithEmailAndPassword(name, email, password);
    logout();
    alert("user created successfully")

  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  return (
    <form>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          name="fullName"
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>


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

      <PasswordStrengthBar password={password} />


      <PasswordChecklist
        rules={["minLength", "specialChar", "number", "capital"]}
        minLength={5}
        value={password}
        className="mb-3"
        // valueAgain={passwordAgain}
        onChange={(isValid) => {

          if (isValid) {
            setverified(true)
          } else {
            setverified(false)
          }
        }}
      />


      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={register} disabled={!verified}>
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  )
}


