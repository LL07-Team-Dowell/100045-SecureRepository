import './App.css';
import { useStateValue } from "./Context/StateProvider";
import DowellLogin from "./Components/Dowell Login/dowellLogin";
import Loader from "./Components/Loader/Loader";
import CreatePortfolio from "./Components/Create Portfolio/createPortfolio";
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterForm from "./Components/Register Form/form";
import ReportRepo from './Components/Report/ReportRepo';
import BackupRepo from "./Components/Report/BackupRepo";
import Home from './Components/Home/Home';



function App() {
  const [state, dispatch] = useStateValue();  
  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  if (state.user === null) {
    return (
      <>
          {<DowellLogin />}
          {searchParams ? <Loader /> : null}       
      </>
    );
  }
   else {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const portfolioInfo = userInfo.portfolio_info?.filter(
      (info) => info.product === "Secure Repositories"
    );
    return portfolioInfo?.length ? (
      <>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<RegisterForm />} />
          <Route exact path="/backup" element={<BackupRepo />} />
          <Route exact path="/reportrepo" element={<ReportRepo />} />
        </Routes>
      </>
    ) : (
      <CreatePortfolio />
    );
  }
}
export default App;


