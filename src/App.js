import SideBar from "./Components/Sidebar/sidebar";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Components/Home/home";
import RegisterForm from "./Components/Register Form/form";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
function App() {
  return (
    <>
      {" "}
      <DowellLogin />
      <SideBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
