import React from "react";
import "./sidebar.css";
import logo from "../Assets/Sidebar Assets/logo.png";
// import mainLogo from "../Assets/Sidebar Assets/mainLogo.webp";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
  
      <aside className="sidebar">
        <div className="sidebar-header-top">
          <a href="../../../public/index.html">
            {" "}
            <img className="logo" src={logo} alt="logo" />{" "}
          </a>
          <h3 className="title">GitHub Backup</h3>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="sidebar-header-bottom">
          <i className="fa-solid fa-power-off tooltip">
            <span className="tooltiptext">Logout</span>
          </i>

          <i className="fa-solid fa-user tooltip">
            <span className="tooltiptext">Profile</span>
          </i>

          <i className="fa-solid fa-house tooltip">
            <span className="tooltiptext">Home</span>
          </i>

          <i className="fa-solid fa-ellipsis-vertical tooltip">
            <span className="tooltiptext">Settings</span>
          </i>
        </div>

        <div className="user-profile">
          <i className="fa-solid fa-circle-user"></i>
          <span className="user-name">Welcome Savinder</span>
        </div>
        <div className="main-logo">
          <span className="user-name">Savinder</span>
          {/* <img src={mainLogo} alt="main-logo" /> */}
        </div>

        <div className="btn-container">
          <Link to="/register" id="button-register">
            {" "}
            <button className="button-register">Register</button>
          </Link>

          <a href="register" id="button-register">
            {" "}
            <button className="button-register">Backup Report</button>
          </a>
          <a href="register" id="button-register">
            {" "}
            <button className="button-register">Repository Report</button>
          </a>
        </div>

        <div className="sidebar-bottom">
          <i className="fa-solid fa-power-off tooltip">
            <span className="tooltiptext">Logout</span>
          </i>

          <i className="fa-solid fa-user tooltip">
            <span className="tooltiptext">Profile</span>
          </i>

          <i className="fa-solid fa-house tooltip">
            <span className="tooltiptext">Home</span>
          </i>

          <i className="fa-solid fa-shield-halved tooltip">
            <span className="tooltiptext">Legal Status</span>
          </i>

          <i className="fa-solid fa-gear tooltip">
            <span className="tooltiptext">Settings</span>
          </i>
        </div>
      </aside>
      
    </>
  );
};

export default SideBar;
