import React, { useState, useEffect } from "react";
import "./Table.css";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import userContext from "../Custom Hooks/userContext";
import { Text } from "@nextui-org/react";

export default function BackupRepo() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const { userInfo } = useContext(userContext);
  const [portfolio] = userInfo?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );

  useEffect(() => {
    getReport(portfolio.org_id);
  }, []);

  async function getReport(org_id) {
    const data = await fetch(
      `https://100045.pythonanywhere.com/reports/get-backup-reports/${org_id}/`
    );
    const dataJson = await data.json();
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

  const renderTable = () => {
    if (data.length === 0)
      return (
        <div className="loader-container">
          {" "}
          <Loader />
        </div>
      );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return (
      <div className="table-box">
        <table className="table">
          <tr>
            <th>S.No</th>
            <th>Backup Date</th>
            <th>Function Name</th>
            <th>Show More</th>
          </tr>
          {console.log(currentItems)}
          {currentItems?.map((row, rowIndex) => (
            <tr className="tabdata" key={rowIndex}>
              <td>{startIndex + rowIndex + 1}</td>
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
        <div className="pagination">
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (item, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
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
      <Text
        h1
        css={{
          color: "#1976d2",
          fontSize: "1.5rem",

          "@xs": {
            fontSize: "2rem",
          },
          "@sm": {
            fontSize: "2.5rem",
          },
          "@md": {
            fontSize: "3rem",
          },
          "@lg": {
            fontSize: "4rem",
          },
          "@xl": {
            fontSize: "5rem",
          },
        }}
        weight="bold"
      >
        Backup Report
      </Text>
      {renderTable()}
      {renderSelectedTable()}
    </div>
  );
}
