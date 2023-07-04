import { Link, json } from "react-router-dom";
import "./home.css";
import FaceIcon from "@mui/icons-material/Face";
import { useStateValue } from "../../Context/StateProvider";

export default function Home() {
  const [state] = useStateValue();
  const [portfolio] = state.user?.portfolio_info?.filter(
      (item) => item?.product === "Secure Repositories"
  );
  
  return (
    <div className="home-text-container">
      <div className="container">
        <h1 className="title">Welcome to Secure Repository!</h1>
        <p className="message">
          Please click the 'Register' button to Secure your Repository
        </p>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
      <div className="profile-container">
        <p className="title">
          <span>
            <FaceIcon className="title-icon" />
          </span>
           Profile
        </p>
        <div className="profile-row">
          <p className="left">Member Type :</p>
          <p className="right">{portfolio?.member_type}</p>
        </div>
        <div className="profile-row">
          <p className="left">UserName :</p>
          <p className="right">{portfolio?.username}</p>
        </div>
        <div className="profile-row">
          <p className="left"> Portfolio Name: </p>
          <p className="right">{portfolio?.portfolio_name}</p>
        </div>
        <div className="profile-row">
          <p className="left"> Data Type : </p>
          <p className="right">{portfolio?.data_type}</p>
        </div>
        <div className="profile-row">
          <p className="left">Operational Rights :</p>
          <p className="right">{portfolio?.operations_right}</p>
        </div>
        <div className="profile-row">
          <p className="left">Role :</p>
          <p className="right">{portfolio?.role}</p>
        </div>
        <div className="profile-row">
          <p className="left">Organization Name :</p>
          <p className="right">{portfolio.org_name}</p>
        </div>
      </div>
    </div>
  );
}
