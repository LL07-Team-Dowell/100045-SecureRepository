import SideBar from "./Components/Sidebar/sidebar";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Components/Home/home";
import RegisterForm from "./Components/Register Form/form";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import { useState } from "react";
import userContext from "./Components/Custom Hooks/userContext";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [userInfo, setUserInfo] = useState({
    userInfo: [{ userInfo: "test" }],
  });

  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");

  // const [isSessionId, setIsSessionId] = useState(
  //   sessionStorage.getItem("session_id")
  // );
  // useEffect(() => {
  //   const session_id = sessionStorage.getItem("session_id");
  //   setIsSessionId(session_id);
  // }, [sessionStorage]);

  if (userInfo?.userInfo?.[0]?.userInfo === "test") {
    return (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          {<DowellLogin />}
          {searchParams ? (
            <div style={{ position: "fixed", left: "47%", top: "50%" }}>
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          ) : (
            <></>
          )}
        </userContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <userContext.Provider
          value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
        >
          <SideBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<RegisterForm />} />
          </Routes>
        </userContext.Provider>
      </>
    );
  }
}
export default App;
