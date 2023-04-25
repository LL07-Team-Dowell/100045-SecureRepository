import React, { useState, useEffect } from "react";
import "./report.css";
import { RotatingLines } from "react-loader-spinner";

function ApiDataModal2() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    const data = await fetch(
      `https://100045.pythonanywhere.com/reports/get-backup-reports/64063b64efadad9c695ee232/`
    );
    const dataJson = await data.json();
    console.log(dataJson);
    setData(dataJson.data);
  }

  const handleTableClick = (selected) => {
    setSelectedData(selected);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedData([]);
    setShowModal(false);
  };

  console.log("sele", selectedData);
  const renderTable = () => {
    if (data.length === 0)
      return (
        <div>
          {" "}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      );

    return (
      <table className="table">
        <tr>
          <th>S.No</th>
          <th>Backup Date</th>
          <th>Function Name</th>
          <th>Show More</th>
        </tr>
        {data?.map((row, rowIndex) => (
          <tr className="tabdata" key={rowIndex}>
            <td>{rowIndex + 1}</td>
            <td>{row.backup_date}</td>
            <td>{row.function_number}</td>
            <td>
              <button
                className="button-know-more"
                onClick={() => handleTableClick([row])}
              >
                Show More
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  };

  const renderSelectedTable = () => {
    if (selectedData.length === 0) return null;

    const [row] = selectedData;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>

          <table className="table">
            <tr>
              <th>Backup Date </th>
              <th>{row.backup_date}</th>
            </tr>
            <tr>
              <td>Backup Time</td>
              <td>{row.backup_time}</td>
            </tr>
            <tr>
              <td>Company ID</td>
              <td>{row.company_id}</td>
            </tr>
            <tr>
              <td>Event ID</td>
              <td>{row.eventId}</td>
            </tr>
            <tr>
              <td>Function Name</td>
              <td>{row.function_number}</td>
            </tr>
            <tr>
              <td>Zip File</td>
              <td>{row.zip_file_name}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="table-container">
      <h1>Backup Report</h1>
      {renderTable()}
      {renderSelectedTable()}
    </div>
  );
}

export default ApiDataModal2;
