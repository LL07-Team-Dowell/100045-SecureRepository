import "./home.css";
import React from "react";
import { useStateValue } from "../../Context/StateProvider";
import { AddBoxOutlined } from "@mui/icons-material";
import Popup from "../Popup/Popup";

export default function Profile() {
  const [state] = useStateValue();
  const [link, setLinks] = React.useState(0);
  const [toggle, setToggle] = React.useState(0);
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  const [buttonPopup, setButtonPopup] = React.useState(false);

  function handleClick(row) {
    setButtonPopup(true);
  }

  console.log(portfolio);
  return (
    <div className="product" style={{ maxWidth: "500px" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddBoxOutlined style={{ fontSize: "20px", color: "green" }} />
          <h3>Create a product link</h3>
        </div>

        <p style={{ display: "block" }}>
          Create a product link to share this amazing product.
        </p>
        <button onClick={handleClick}>Generate Link</button>
      </div>
      {/* <div className="profile-container">
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
      </div> */}
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} copy={false}>
        {toggle ? (
          <div className="content">
            <h3 style={{ marginBottom: "10px" }}>Create Custom Name</h3>
            <p style={{ color: "#555", marginBottom: "20px" }}>
              One last step add a custom name for this link
            </p>

            <label>
              Enter a name for link <span style={{ color: "red" }}>*</span>
              <input type="text" placeholder="custom link Name" style={{
                display: "block",
                border: "1px solid #555",
                outline: "none",
                padding: "10px",
                borderRadius: "5px",
                width: "300px",
                marginTop: "8px"
              }} />
            </label>
          </div>
        ) : (
          <div className="content">
            <h3>Share this Product</h3>
            <p style={{ color: "#555" }}>
              generate a Link to this product for others to view their secure
              Repositories
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h5 style={{ marginBottom: "10px" }}>Enter number of links</h5>
                <input
                  type="number"
                  min="0"
                  style={{ marginBottom: "20px" }}
                  value={link}
                />
              </div>
              <button style={{ width: "100px" }}>Go</button>
            </div>

            <div>
              <form>
                <label
                  for="links"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Select number of public links</h5>
                  <p style={{ fontSize: "13px", color: "#555" }}>Count: 0</p>
                </label>
                <select
                  style={{
                    margin: "10px 0",
                    outline: "0",
                    backgroundColor: "#f4f4f4",
                    border: " 1px solid #555",
                    borderRadius: "5px",
                  }}
                  size={10}
                  multiple
                >
                  <option value="javascript">JavaScript</option>
                  <option value="php">PHP</option>
                  <option value="java">Java</option>
                  <option value="golang">Golang</option>
                  <option value="python">Python</option>
                  <option value="c#">C#</option>
                  <option value="C++">C++</option>
                  <option value="erlang">Erlang</option>
                </select>
              </form>
            </div>
          </div>
        )}
        <button onClick={() => setToggle(true)}>Generate Link</button>
      </Popup>
    </div>
  );
}
