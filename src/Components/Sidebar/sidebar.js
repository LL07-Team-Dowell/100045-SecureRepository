import React from "react";
import "./sidebar.css";
import logo from "../Assets/Sidebar Assets/logo.png";
import MainLogo from "../Assets/Sidebar Assets/MainLogo.png";
import { Link } from "react-router-dom";
import logoutUrl from "../Constants/constant";
import { profileUrl } from "../Constants/constant";
import { usePortfolioData } from "../Portfolio Info/usePortfolioInfo";
import { useEffect } from "react";
import axios from "axios";
import { Accordion } from "../Accordian/accordian";
import { useState } from "react";

const SideBar = () => {
  const [data, setData] = useState("");
  const [userInfo, setUserInfo] = useState(localStorage.getItem("userInfo"));

  useEffect(() => {
    const handleStorageChange = () => {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("userInfo")));
  }, [setUserInfo]);

  const portfolio = data?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  const portfolioInfo = portfolio?.[0];

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header-top">
          <img className="logo" src={logo} alt="logo" />
          <h3 className="title">GitHub Backup</h3>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="sidebar-header-bottom">
          <a href={logoutUrl}>
            <i className="fa-solid fa-power-off tooltip">
              <span className="tooltiptext">Logout</span>
            </i>
          </a>

          <a href={profileUrl}>
            <i className="fa-solid fa-user tooltip">
              <span className="tooltiptext">Profile</span>
            </i>
          </a>

          <Link to="/">
            <i className="fa-solid fa-house tooltip">
              <span className="tooltiptext">Home</span>
            </i>
          </Link>

          <i className="fa-solid fa-ellipsis-vertical ">
            <div className="portfolio-info">
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">Member Type</span>:{" "}
                  {portfolioInfo?.member_type}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  <span className="portfolio-key">Portfolio Name </span>:{" "}
                  {portfolioInfo?.portfolio_name}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">Username : </span>{" "}
                  {portfolioInfo?.username}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">Data Type </span>:{" "}
                  {portfolioInfo?.data_type}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">Operation </span> :{" "}
                  {portfolioInfo?.operations_right}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">Role </span> :{" "}
                  {portfolioInfo?.role}{" "}
                </span>
              </div>
              <div className="portfolio-item">
                <span>
                  {" "}
                  <span className="portfolio-key">
                    {" "}
                    Organization Name{" "}
                  </span>: {portfolioInfo?.org_name}{" "}
                </span>
              </div>
            </div>
          </i>
        </div>

        <div className="user-profile">
          <i className="fa-solid fa-circle-user"></i>
          <span className="user-name">Welcome {data?.userinfo?.username}</span>
        </div>
        <div className="main-logo">
          <span className="user-name">{data?.userinfo?.username}</span>
          <img src={MainLogo} alt="main-logo" />
        </div>

        <div className="btn-container">
          <Link to="/register" id="button-register">
            {" "}
            <button className="button-register">Register</button>
          </Link>
          <div className="line"></div>
          <div>
            <Accordion title="Reports">
              <ul>
                <li>
                  {" "}
                  <Link> Backup Report </Link>
                </li>
                <li>
                  {" "}
                  <Link> Repository Report </Link>
                </li>
              </ul>
            </Accordion>
          </div>
        </div>

        <div className="sidebar-bottom">
          <a href={logoutUrl}>
            <i className="fa-solid fa-power-off tooltip">
              <span className="tooltiptext">Logout</span>
            </i>
          </a>

          <a href={profileUrl}>
            <i className="fa-solid fa-user tooltip">
              <span className="tooltiptext">Profile</span>
            </i>
          </a>

          <Link to="/">
            <i className="fa-solid fa-house tooltip">
              <span className="tooltiptext">Home</span>
            </i>
          </Link>
          <Link>
            <i className="fa-solid fa-shield-halved tooltip">
              <span className="tooltiptext">Legal Status</span>
            </i>
          </Link>
          <Link>
            <i className="fa-solid fa-gear tooltip">
              <span className="tooltiptext">Settings</span>
            </i>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
