import React, { useContext } from "react";
import "./sidebar.css";
import logo from "../Assets/Sidebar Assets/logo.png";
import MainLogo from "../Assets/Sidebar Assets/MainLogo.png";
import { Link } from "react-router-dom";
import logoutUrl from "../Constants/constant";
import { profileUrl } from "../Constants/constant";
import userContext from "../Custom Hooks/userContext";

const SideBar = () => {
  const { userInfo } = useContext(userContext);
  const data = userInfo;
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
          <div className="register-repository link-container">
            <h3 className="title">Register Repository</h3>
            <Link to="/register" id="button-register">
              Register
            </Link>
            <div className="horizontal-line"></div>
          </div>

          <div className="reports link-container">
            <h3 className="title">Reports</h3>
            <Link to="/backup">Backup Report</Link>
            <div className="horizontal-line"></div>
            <Link to="/report">Repository Report</Link>
            <div className="horizontal-line"></div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <span className="company-name">
            Dowell True moments user experience lab
          </span>
          <div className="real-data">
            <span>6</span>
            <span> {portfolioInfo?.data_type} </span>
          </div>

          <div className="sidebar-bottom-icons">
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
        </div>
      </aside>
     
    </>
  );
};

export default SideBar;
