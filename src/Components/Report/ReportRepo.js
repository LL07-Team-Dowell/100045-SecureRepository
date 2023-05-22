import React, { useState, useEffect } from "react";
import "./Table.css";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import userContext from "../Custom Hooks/userContext";
import { Text } from "@nextui-org/react";
import { useQuery } from "react-query";
async function getReport(org_id) {
  const data = await fetch(
    `https://100045.pythonanywhere.com/reports/get-respository-reports/${org_id}/`
  );
  const dataJson = await data.json();
 
  console.log(data)
  return dataJson.data;
}
function ReportRepo() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const { userInfo } = useContext(userContext);
  const [portfolio] = userInfo?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );



  const { isLoading, isError, data, error, isFetching } = useQuery(
    ["get-reports"],
    ()=> getReport(portfolio.org_id),
    { refetchOnMount : false}
  );
  console.log(data);

  

  const handleTableClick = (selected) => {
    setSelectedData(selected);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedData([]);
    setShowModal(false);
  };

  const renderTable = () => {
    if (isLoading) {
      return (
        <div className="loader-container">
          <Loader />
        </div>
      );
    } else {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentItems = data.slice(startIndex, endIndex);

      return (
        <div className="table-box">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Date of Registration</th>
                <th>Repository Name</th>
                <th>Show More</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row, rowIndex) => (
                <tr className="tabdata" key={rowIndex}>
                  <td>{startIndex + rowIndex + 1}</td>
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
            </tbody>
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
    }
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
        Repository Reports
      </Text>
      {renderTable()}
      {renderSelectedTable()}
    </div>
  );
}

export default ReportRepo;

