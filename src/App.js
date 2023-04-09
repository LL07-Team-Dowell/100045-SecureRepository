import SideBar from "./Components/Sidebar/sidebar";
import { Route } from "react-router-dom";
import { Routes, Router } from "react-router-dom";
import Home from "./Components/Home/home";
import RegisterForm from "./Components/Register Form/form";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import { useState, useEffect, useContext } from "react";
import Report from "./Components/Report/report";
import Backup from "./Components/Report/backup";
import userContext from "./Components/Custom Hooks/userContext";

function App() {
  const [userInfo, setUserInfo] = useState({
    userInfo: [{ myname: "savi" }],
  });
  const [isSessionId, setIsSessionId] = useState(
    sessionStorage.getItem("session_id")
  );
  useEffect(() => {
    const session_id = sessionStorage.getItem("session_id");
    setIsSessionId(session_id);
  }, [sessionStorage]);

  if (!isSessionId) {
    return (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          {<DowellLogin />}
        </userContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          {" "}
          <SideBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<RegisterForm />} />
            <Route exact path="/report" element={<Report />} />
            <Route exact path="/backup" element={<Backup />} />
          </Routes>{" "}
        </userContext.Provider>
      </>
    );
  }
}
export default App;
