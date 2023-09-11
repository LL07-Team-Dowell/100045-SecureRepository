import "./App.css";
import { useStateValue } from "./Context/StateProvider";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import Loader from "./Components/Loader/Loader";
import CreatePortfolio from "./Components/Create Portfolio/createPortfolio";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./Components/Register Form/form";
import ReportRepo from "./Components/Report/ReportRepo";
import BackupRepo from "./Components/Report/BackupRepo";
import Home from "./Components/Home/home";
import Profile from "./Components/Home/profile";
import Public from "./Components/Public/Public";
import ViewPublic from "./Components/viewPublic/viewPublic";

function App() {
  const [state, dispatch] = useStateValue();
  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  const viewParams = queryParams.get("view");
  const qr_idParams = queryParams.get("qr_id");
  const company_idParams = queryParams.get("company_id");

  if (state.user === null) {
    return (
      <>
        {<DowellLogin />}
        {searchParams ? <Loader /> : null}
        {viewParams &&
          viewParams == "public" &&
          qr_idParams &&
          company_idParams && (
            <>
              <Navbar public="true" />
              <ViewPublic />
            </>
          )}
      </>
    );
  } else {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const portfolioInfo = userInfo.portfolio_info?.filter(
      (info) => info.product === "Secure Repositories"
    );

    return portfolioInfo?.length ? (
      <>
        <div
          style={{
            position: "relative",
            top: "100px",
          }}
        >
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route
              exact
              path="/public"
              element={
                <>
                  <Navbar />
                  <Public />
                </>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <>
                  <Navbar />
                  <RegisterForm />
                </>
              }
            />
            <Route
              exact
              path="/backup"
              element={
                <>
                  <Navbar />
                  <BackupRepo />
                </>
              }
            />
            <Route
              exact
              path="/reportrepo"
              element={
                <>
                  <Navbar />
                  <ReportRepo />
                </>
              }
            />
            <Route exact path="*" element={<h1>Page not Found</h1>} />
          </Routes>
        </div>
      </>
    ) : (
      <CreatePortfolio />
    );
  }
}
export default App;
