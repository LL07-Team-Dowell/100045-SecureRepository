import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Components/Home/Home.js";
import RegisterForm from "./Components/Register Form/form";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import { useState } from "react";
import userContext from "./Components/Custom Hooks/userContext";
import CreatePortfolio from "./Components/Create Portfolio/createPortfolio";
import Navbar from "./Components/Navbar/Navbar.js";
import Loader from "./Components/Loader/Loader";
import BackupRepo from "./Components/Report/BackupRepo.js";
import ReportRepo from "./Components/Report/ReportRepo.js";

function App() {
  const [userInfo, setUserInfo] = useState({
    userInfo: [{ userInfo: "test" }],
  });
  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  if (userInfo?.userInfo?.[0]?.userInfo === "test") {
    return (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          {<DowellLogin />}
          {searchParams ? <Loader /> : null}
        </userContext.Provider>
      </>
    );
  } else {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const portfolioInfo = userInfo.portfolio_info?.filter(
      (info) => info.product === "Secure Repositories"
    );

    return portfolioInfo?.length ? (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<RegisterForm />} />
            <Route exact path="/repo reports" element={<ReportRepo />} />
            <Route exact path="/backup repo" element={<BackupRepo />} />
          </Routes>
        </userContext.Provider>
      </>
    ) : (
      <CreatePortfolio />
    );
  }
}
export default App;
