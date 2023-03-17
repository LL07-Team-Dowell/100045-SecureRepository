import React, { useState } from "react";
import "./sidebar.css";
import logo from "../Assets/Sidebar Assets/logo.png";
import { Link } from "react-router-dom";

// import RegisterRepository from "../Forms/form";

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
          <i className="fa-solid fa-power-off"></i>
          <i className="fa-solid fa-user"></i>
          <i className="fa-solid fa-house"></i>
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div className="user-profile">
          <i className="fa-solid fa-circle-user"></i>
          <span className="user-name">Welcome User001</span>
        </div>
        <Link to="/register" id = 'button-register'>
          {" "}
          <button className="button-register">Register Repository</button>
        </Link>
      </aside>
    </>
  );
};

export default SideBar;
