import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../Assets/Sidebar Assets/logo.png";
import logoutUrl from "../Constants/constant";
import { profileUrl } from "../Constants/constant";
import { useContext } from "react";
import userContext from "../Custom Hooks/userContext";

const pages = [
  { linkName: "Home", path: "/" },
  { linkName: "Register", path: "/register" },
  { linkName: "Backup Repo", path: "/backup repo" },
  { linkName: "Repo Reports", path: "/repo reports" },
];

const settings = [
  { linkName: "Client Admin", path: profileUrl },
  { linkName: "Policy", path: "#" },
  { linkName: "Settings", path: "#" },
  { linkName: "Logout", path: logoutUrl },
];

function Navbar() {
  const [portfolioInfo, setPortfolioInfo] = useState([]);
  const { userInfo } = useContext(userContext);
  const data = userInfo;
  const [portfolio] = data?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  useEffect(() => {
    setPortfolioInfo([
      "Member Type : " + portfolio?.member_type,
      "Portfolio Name: " + portfolio?.portfolio_name,
      "User Name : " + data?.userinfo?.username,
      "Data Type : " + portfolio?.data_type,
      "Operational Rights : " + portfolio?.operations_right,
      "Role : " + portfolio?.role,
      "Organization Name : " + portfolio.org_name,
    ]);
  }, [portfolio]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElUserInfo, setAnchorElUserInfo] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserInfo = (event) => {
    setAnchorElUserInfo(event.currentTarget);
  };
  const handleCloseUserInfo = () => {
    setAnchorElUserInfo(null);
  };
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img className="company-logo" src={Logo} alt="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => {
                return (
                  <Link
                    key={page.linkName}
                    to={page.path}
                    style={{
                      textDecoration: "none",
                      color: "rgba(0, 0, 0, 0.87)",
                    }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        {page.linkName}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img className="company-logo" src={Logo} alt="log" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              return (
                <Link
                  key={page.linkName}
                  to={page.path}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <Button
                    key={page.linkName}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.linkName}
                  </Button>
                </Link>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Portfolio Info">
              <IconButton
                style={{ cursor: "pointer" }}
                onClick={handleOpenUserInfo}
                sx={{ p: 0 }}
              >
                <i className="fa-solid fa-address-book"></i>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUserInfo}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUserInfo)}
              onClose={handleCloseUserInfo}
            >
              {portfolioInfo?.map((info) => {
                return (
                  <MenuItem onClick={handleCloseUserInfo} key={info}>
                    <Typography textAlign="center">{info}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>

            <Tooltip title="Open settings">
              <IconButton
                style={{ cursor: "pointer" }}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={data?.userinfo?.username.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting,index) => (
                <a key = {index} className="settings-link" href={setting.path} target="blank">
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {setting.linkName}
                    </Typography>
                  </MenuItem>
                </a>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
