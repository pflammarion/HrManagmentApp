import React, { useState, useEffect } from "react";
import {Routes, Route, Link, useParams, Navigate} from "react-router-dom";
import "./App.css";
import logo from "./assets/badge.svg"

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EmployeeList from "./components/EmployeeList";

import EventBus from "./common/EventBus";
import EmployeeInfo from "./components/EmployeeInfo";
import EditEmployee from "./components/EditEmployee";
import CreateEmployee from "./components/CreateEmployee";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";

const App = () => {

  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);


  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <div className={"navbar"}>
        <Link to={"/"}>
          <img src={logo} id={"home-logo"}/>
        </Link>
          {(showModeratorBoard || showAdminBoard)  && (

              <Link to={"/user"} id={"user"}>
                User
              </Link>
            )}

          {currentUser && (
              <Link to={"/employee"} id="employee">
              Employee
              </Link>
          )}

        {currentUser ? (
            <>
              <Link to={"/profile"} id={"profile"}>
                {currentUser.username}
              </Link>
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
              </>
        ) : (
          <>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
          </>
        )}
      </div>


      <div className="content">

        {showAdminBoard && (
          <Routes>
            <Route path="/user/edit/:userId" element={<EditUser/>} />
            <Route path="/employee/edit/:employeeId" element={<EditEmployee/>} />
          </Routes>

          )}

        {(showModeratorBoard || showAdminBoard)  && (
            <Routes>
              <Route path="/register" element={<Register/>} />
              <Route path="/user" element={<UserList/>} />
              <Route path={"/employee/create"} element={<CreateEmployee/>} />
              <Route path="/employee/:employeeId" element={<EmployeeInfo/>} />
            </Routes>
        )}
      {currentUser ? (
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/employee" element={<EmployeeList/>} />
        </Routes>
      ) : (
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path='*' element={<Home />}/>
          </Routes>
      )}

      </div>
      <div className={"footer"}>
          <p>© St62487  |  2022</p>
      </div>
    </div>
  );
};

export default App;
