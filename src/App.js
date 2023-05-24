import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import DashBoard from './components/DashBoard'

// import Login from './components/login.component'
// import SignUp from './components/signup.component'

function App() {

  const [userData, setUserData] = useState("")

  console.log("userData", userData);
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              App
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login setUserData={setUserData} />} />
              <Route path="/sign-up" element={<Register setUserData={setUserData} />} />
              <Route path="/dashboard" element={<DashBoard userData={userData} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
