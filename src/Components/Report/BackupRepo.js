import React, { useState, useEffect } from "react";
import "./Table.css";
import { useStateValue } from "../../Context/StateProvider";
import Popup from "../Popup/Popup";
import Loader from "../Loader/Loader";

import axios from "axios";

function BackupRepo() {
  const [state, dispatch] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState([]);
  const [buttonPopup, setButtonPopup] = React.useState(false);
  const [data, setData] = useState([]);

  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  useEffect(() => {
    // Use useEffect to make the API call and update data state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-backup-reports/${portfolio.org_id}/`
        );
        if (response.data.data.length === 0) {
          setData(["empty"]);
        } else {
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function
  }, [portfolio.org_id]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  function handleClick(row) {
    setButtonPopup(true);
    setSelectedData(row);
    console.log(selectedData);
  }

  return (
    <div className="table-container">
      <h3>Backup Report</h3>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="content">
          <div className="left">
            {[
              "Backup Time ",
              "Added Files",
              "Modified Files",
              "Removed Files",
              "Function Name",
              "Created By",
              "Commit URL",
            ].map((item) => (
              <p key={item}>{item}:</p>
            ))}
          </div>
          <div className="right">
            <p>{selectedData[0]?.backup_time}</p>
            {selectedData[0]?.added_file &&
              selectedData[0].added_file.length > 0 && (
                <p>{selectedData[0].added_file[0]}</p>
              )}
            {selectedData[0]?.modified_file &&
              selectedData[0].modified_file > 0 && (
                <p>{selectedData[0].modified_file[0]}</p>
              )}
            {selectedData[0]?.removed_file &&
              selectedData[0].removed_file > 0 && (
                <p>{selectedData[0].removed_file[0]}</p>
              )}
            <p>{selectedData[0]?.function_number}</p>
            <p>{selectedData[0]?.pusher}</p>
            <p>{selectedData[0]?.commit_url}</p>
          </div>
        </div>
      </Popup>
      {currentItems.length === 0 ? (
        <Loader />
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Repository</th>
              <th>Zip File</th>
              <th>Commit Message</th>
              <th>Show More</th>
            </tr>
          </thead>
          <tbody>
            {data[0] !== "empty" &&
              currentItems.map((row, rowIndex) => (
                <tr className="tabdata" key={rowIndex}>
                  <td>{startIndex + rowIndex + 1}</td>
                  <td>{row.repository_name}</td>
                  <td>{row.zip_file_name}</td>
                  <td>{row.commit_message}</td>
                  <td>
                    <button
                      className="button-know-more"
                      onClick={() => handleClick([row])}
                    >
                      Show More
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
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

export default BackupRepo;
