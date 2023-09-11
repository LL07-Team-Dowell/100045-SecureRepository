import "../Home/home.css";
import React from "react";
import { useStateValue } from "../../Context/StateProvider";
import { AddBoxOutlined, FileCopy } from "@mui/icons-material";
import Popup from "../Popup/Popup";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Public() {
  const [state] = useStateValue();
  const [link, setLinks] = React.useState([]);
  const [toggle, setToggle] = React.useState(0);
  // const [portfolio] = state.user?.portfolio_info?.filter(
  //   (item) => item?.product === "Secure Repositories"
  // );

  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  const [linkNo, setLinkNo] = React.useState(0);
  // const [qrIDS, setQrIDS] = React.useState([]);
  const [selectLinks, setSelectLinks] = React.useState([]);
  const [buttonPopup, setButtonPopup] = React.useState(false);
  const [selectToggle, setSelectToggle] = React.useState(false);
  const [customName, setcustomName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [qrCode, setQrcode] = React.useState();
  const [masterLink, setMasterLink] = React.useState("");

  function handleClick(row) {
    setButtonPopup(true);
  }

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state

    const fetchQRids = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/generate-master-link/${portfolio.org_id}/?type=get_qr_ids`
        );
        if (response.data === 0) {
          console.log("error");
        } else {
          setLinks(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
      // Call the async function
    };
    const fetchMasterLinks = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/generate-master-link/${portfolio.org_id}/?type=master_link_details`
        );
        if (response.data === 0) {
          console.log("error");
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQRids();

    fetchMasterLinks();
  }, [portfolio.org_id]);

  function handleLinkNoChange(event) {
    const { value } = event.target;
    setLinkNo((prev) => {
      return value;
    });
  }

  console.log(`selected ${selectLinks}`);

  function handleGoClick() {
    setSelectToggle(true);
  }

  function handleSelectChange(event) {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    console.log(selectedOptions);
    setSelectLinks(selectedOptions);
  }

  const createMaster = async (links, name) => {
    const requestHeaders = {
      product_url:
        "https://ll07-team-dowell.github.io/100045-SecureRepository/",
      qr_ids: links,
      company_id: portfolio.org_id,
      link_name: name,
    };
    console.log(requestHeaders);

    try {
      const res = await axios.post(
        "https://100045.pythonanywhere.com/reports/generate-master-link/",
        requestHeaders
      );
      console.log(res);
      setMessage(res.data.message);
      setQrcode(res.data.qr_code);
      setMasterLink(res.data.master_link);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  console.log(message, qrCode, masterLink);
  const userInfoQrLinks = new Set(
    state.user?.selected_product?.userportfolio
      .filter((item) => {
        return item.member_type === "public";
      })
      .map((item) => item?.username)
      .flat()
  );

  // difference between userinfo qr and links

  let unusedlinks = [
    ...Array.from(userInfoQrLinks).filter(
      (value) => !Object.values(link).includes(value)
    ),
    ...Object.values(link).filter(
      (value) => !Array.from(userInfoQrLinks).includes(value)
    ),
  ];
  console.log(`unused ${unusedlinks}`);

  return (
      <div
        className="product"
        style={{ maxWidth: "500px", margin: "10px auto" }}
      >
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
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} copy={false}>
          {toggle === "1" ? (
            <div className="content">
              <p
                style={{ color: "#555", fontWeight: "bold" }}
                onClick={() => setToggle(false)}
              >
                {"<"}-Back
              </p>
              <h3 style={{ marginBottom: "10px" }}>Create Custom Name</h3>
              <p style={{ color: "#555", marginBottom: "20px" }}>
                One last step add a custom name for this link
              </p>

              <label>
                Enter a name for link <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  placeholder="custom link Name"
                  style={{
                    display: "block",
                    border: "1px solid #555",
                    outline: "none",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "300px",
                    marginTop: "8px",
                  }}
                  value={customName}
                  onChange={(event) => setcustomName(event.target.value)}
                />
              </label>
              <button
                onClick={() => {
                  customName === ""
                    ? alert("please enter a custom Name")
                    : createMaster(selectLinks, customName) && setToggle("2");
                }}
              >
                Generate Link
              </button>
            </div>
          ) : toggle === "2" ? (
            message &&
            qrCode &&
            masterLink && (
              <div style={{ marginTop: "60px" }} className="api-result">
                <h4>Created Successfully! {message}</h4>
                <p>
                  <b>Master Link: </b>
                  {masterLink}
                  <CopyToClipboard
                    text={masterLink}
                    onCopy={() => alert("Master link copied succesfully")}
                  >
                    <FileCopy className="icon" />
                  </CopyToClipboard>
                </p>
                <p>
                  <b>Qr code: </b>
                  {qrCode}
                  <CopyToClipboard
                    text={qrCode}
                    onCopy={() => alert("Qr code copied successfully")}
                  >
                    <FileCopy className="icon" />
                  </CopyToClipboard>
                </p>
                <center>
                  <img src={qrCode} alt="qr-code" />
                </center>
              </div>
            )
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
                  <h5 style={{ marginBottom: "10px" }}>
                    Enter number of links
                  </h5>
                  <form>
                    <input
                      type="number"
                      min="0"
                      style={{ marginBottom: "20px" }}
                      value={linkNo}
                      onChange={(event) => handleLinkNoChange(event)}
                    />
                  </form>
                </div>
                <button style={{ width: "100px" }} onChange={handleGoClick}>
                  Go
                </button>
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
                    <p style={{ fontSize: "13px", color: "#555" }}>
                      Count: {selectToggle ? linkNo : "0"}
                    </p>
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
                    onChange={handleSelectChange}
                  >
                    {Array.from(unusedlinks).map((key, i) => {
                      if (i >= linkNo) {
                        return (
                          <option key={i} value={key}>
                            {key}
                          </option>
                        );
                      } else {
                        //   if (selectToggle) {
                        return (
                          <option key={i} value={key} selected>
                            {key}
                          </option>
                        );
                        //   }
                        //
                      }
                    })}
                  </select>
                </form>
                <button
                  onClick={() =>
                    selectLinks.length === 0
                      ? alert("please select at least one qrcode link")
                      : setToggle("1")
                  }
                >
                  Generate Link
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
  );
}
