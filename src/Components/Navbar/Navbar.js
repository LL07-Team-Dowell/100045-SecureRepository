import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HomeIcon from "@mui/icons-material/Home";
import BackupIcon from "@mui/icons-material/Backup";
import SummarizeIcon from "@mui/icons-material/Summarize";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";
import  logo  from "../../Images/logo.png"
function Navbar() { 
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

    const logoutUrl =
      "https://100014.pythonanywhere.com/sign-out?redirect_" +
      window.location.origin +
      "/100045-SecureRepository";
  
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img src={logo} alt="logo" style={{ width: "70px" }} />
            <span> Secure Repositories</span>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <HomeIcon className="icon" />
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <HowToRegIcon className="icon" />
                Register Repository
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/backup"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <BackupIcon className="icon" />
                Backup Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/reportrepo"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <SummarizeIcon className="icon" />
                Repository reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={logoutUrl}
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                <Logout className="icon" />
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuIcon />
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
