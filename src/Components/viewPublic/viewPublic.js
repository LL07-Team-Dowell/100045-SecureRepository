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
 const [expired, setExpired] = React.useState(false);

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
          let match = response.data?.qr_ids
            .map((item) => {
              if (item.qr_ids.includes(qr_idParams)) {
                return item;
              }
            })
            .filter((item) => item);
          setQrData(match);
        }
      } catch (error) {
        console.error(error);
      }
    };

   fetchMasterLinks();
   
     setTimeout(() => {
       setExpired(true);
     }, 6000);
  }, [company_idParams]);

  console.log(qrData);

  return (
    <div
      className="container"
      style={{
        position: "relative",
        top: "100px",
        maxWidth: "800px",
        margin: "20px auto",
        wordWrap: "wrap",
      }}
    >
      {data.length > 0 ? (
        <>
          <h2>Share this Product</h2>
          <p>
            <b>Master Link: </b>
            {qrData[0]?.master_link}
            <CopyToClipboard
              text={qrData[0]?.master_link}
              onCopy={() => alert("Master link copied succesfully")}
            >
              <FileCopy className="icon" />
            </CopyToClipboard>
          </p>
          <p>
            <b>Qr code: </b>
            {qrData[0]?.qr_code}

            <CopyToClipboard
              text={qrData[0]?.qr_code}
              onCopy={() => alert("Qr code copied successfully")}
            >
              <FileCopy className="icon" />
            </CopyToClipboard>
          </p>
          <center>
            <img src={qrData[0]?.qr_code} alt="qr-code" />
          </center>
          <h3>Details about this Link</h3>
          <p>
            <b>View Type: </b>
            {viewParams}
          </p>
          <p>
            <b>Qr_Id: </b> {qr_idParams}
          </p>
          <p>
            <b>Company Id:</b> {company_idParams}
          </p>
        </>
      ) : (
        <>
       {!expired && <h4>Loading ...</h4>}
          {expired && (
            <p>
              The link is expired. please contact owner for correct Link details
            </p>
          )}
        </>
      )}
    </div>
  );
}
