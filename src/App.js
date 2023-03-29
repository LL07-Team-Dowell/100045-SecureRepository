import SideBar from "./Components/Sidebar/sidebar";
import { Route } from "react-router-dom";
import { Routes, Router } from "react-router-dom";
import Home from "./Components/Home/home";
import RegisterForm from "./Components/Register Form/form";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [isSessionId, setIsSessionId] = useState(sessionStorage.getItem("session_id"));
  useEffect(() => {
    const session_id = sessionStorage.getItem("session_id");
    setIsSessionId(session_id)
  }, [sessionStorage])

  if (!isSessionId) {
    return <>{<DowellLogin />}</>;
  } else {
    return (
      <>
        {" "}
        <SideBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<RegisterForm />} />
        </Routes>{" "}
      </>
    );
  }
}
export default App;

