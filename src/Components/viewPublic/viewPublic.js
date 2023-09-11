import React from "react";
import axios from "axios";
import "../Home/home.css";
import { FileCopy } from "@mui/icons-material";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ViewPublic() {
  const queryParams = new URLSearchParams(window.location.search);
  const viewParams = queryParams.get("view");
  const qr_idParams = queryParams.get("qr_id");
  const company_idParams = queryParams.get("company_id");
  const [data, setData] = React.useState([]);
  const [qrData, setQrData] = React.useState();

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state

    const fetchMasterLinks = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/generate-master-link/${company_idParams}/?type=master_link_details`
        );
        if (response.data === 0) {
          console.log("error");
        } else {
          console.log(response.data);
          setData(response.data?.qr_ids);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMasterLinks();
  }, [company_idParams]);
  return (
    <div
      className="container"
      style={{
        position: "relative",
        top: "100px",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h2>Share this Product</h2>
      {/* {data?.qr_ids.map((item) => item)} */}

      {/* <p>
        <b>Master Link: </b>
        <CopyToClipboard
          text="hrer"
          onCopy={() => alert("Master link copied succesfully")}
        >
          <FileCopy className="icon" />
        </CopyToClipboard>
      </p>
      <p>
        <b>Qr code: </b>
        <CopyToClipboard
          text="qr"
          onCopy={() => alert("Qr code copied successfully")}
        >
          <FileCopy className="icon" />
        </CopyToClipboard>
      </p>
      <center>
        <img src="{qrCode}" alt="qr-code" />
      </center> */}
      <p>{viewParams}</p>
      <p>{qr_idParams}</p>
      <p>{company_idParams}</p>

      {data.length > 0 ? <h4>data is not null</h4> : <h4>The data is null</h4>}
    </div>
  );
}
