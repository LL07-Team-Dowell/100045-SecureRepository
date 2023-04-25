import React, { useState, useEffect } from "react";
import "./report.css";
import { RotatingLines } from "react-loader-spinner";

function ApiDataModal() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    const data = await fetch(
      `https://100045.pythonanywhere.com/reports/get-respository-reports/64063b64efadad9c695ee232/`
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
    if (data.length === 0) return <div> <RotatingLines
    strokeColor="grey"
    strokeWidth="5"
    animationDuration="0.75"
    width="96"
    visible={true}
  /></div>;

    return (
      <table className="table">
        <tr>
          <th>S.No</th>
          <th>Date of Registration</th>
          <th>Repository Name</th>
          <th>Show More</th>
        </tr>
        {data?.map((row, rowIndex) => (
          <tr className="tabdata" key={rowIndex}>
            <td>{rowIndex + 1}</td>
            <td>{row.date_of_registration}</td>
            <td>{row.repository_name}</td>
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
              <th>Repository Name </th>
              <th>{row.repository_name}</th>
            </tr>
            <tr>
              <td>Created By</td>
              <td>{row.created_by}</td>
            </tr>
            <tr>
              <td>Repository URL</td>
              <td>{row.repository_url}</td>
            </tr>
            <tr>
              <td>Date of Registration</td>
              <td>{row.date_of_registration}</td>
            </tr>
            <tr>
              <td>Time of Registration</td>
              <td>{row.time_of_registration}</td>
            </tr>
            <tr>
              <td>Web Hook Link</td>
              <td>{row.webhook_link}</td>
            </tr>

            <tr>
              <td>Data Type</td>
              <td>{row.data_type}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="table-container">
      <h1>Repository Report</h1>
      {renderTable()}
      {renderSelectedTable()}
    </div>
  );
}

export default ApiDataModal;
