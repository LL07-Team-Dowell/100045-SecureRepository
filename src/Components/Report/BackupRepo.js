import React, { useState, useEffect } from "react";
import "./Table.css";
import { useStateValue } from "../../Context/StateProvider";
import Popup from "../Popup/Popup";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import fileDownload from "js-file-download";

function BackupRepo() {
  const [state, dispatch] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState([]);
  const [buttonPopup, setButtonPopup] = React.useState(false);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

    const fetchGraph = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-statistics/${portfolio.org_id}/`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchGraph();
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

  function handleChange(event) {
    const { value } = event.target;

    setSearchInput((prev) => value);
  }

  function handleDownload(row) {
    axios
      .get(row[0].file_url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, `${row[0].zip_file_name}.zip`);
      });
  }

  const squareli = [];
  for (var i = 1; i < 365; i++) {
    const level = Math.floor(Math.random() * 3);
    squareli.push(<li data-level={level}></li>);
  }

  return (
    <>
      <div className="table-container">
        <h3>Backup Report</h3>
        <input
          className="pagecontrol"
          placeholder="rows"
          type="number"
          max={10}
          min={4}
          value={itemsPerPage}
          name="itemsPerPage"
          onChange={(event) =>
            itemsPerPage && setItemsPerPage(event.target.value)
          }
        />
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup} copy={false}>
          <div className="content">
            <div className="row">
              <h3>Repository Name</h3>
              <p>{selectedData[0]?.repository_name}</p>
            </div>
            <div className="row">
              <h3>Backup Time</h3>
              <p>{selectedData[0]?.backup_time}</p>
            </div>
            <div className="row">
              <h3>Added Files</h3>
              {selectedData[0]?.added_file &&
              selectedData[0].added_file.length > 0 ? (
                // selectedData[0].added_file.map(item => <p>{item}</p>)
                <p>{selectedData[0].added_file[0]}</p>
              ) : (
                <p>No Added Files</p>
              )}
            </div>
            <div className="row">
              <h3>Modified Files</h3>
              {selectedData[0]?.modified_file &&
              selectedData[0].modified_file.length > 0 ? (
                <p>{selectedData[0].modified_file[0]}</p>
              ) : (
                <p>No modified Files</p>
              )}
            </div>
            <div className="row">
              <h3>Removed Files</h3>
              {selectedData[0]?.removed_file &&
              selectedData[0].removed_file.length > 0 ? (
                <p>{selectedData[0].removed_file[0]}</p>
              ) : (
                <p>No Deleted Files</p>
              )}
            </div>
            <div className="row">
              <h3>Created By</h3>
              <p>{selectedData[0]?.pusher}</p>
            </div>
            <div className="row">
              <h3>Commit URL</h3>
              <p>{selectedData[0]?.commit_url}</p>
            </div>
          </div>
        </Popup>
        {currentItems.length === 0 ? (
          <Loader />
        ) : (
          <>
            <form>
              <input
                className="searchbar"
                placeholder="search repository Name"
                onChange={handleChange}
                name="searchInput"
                value={searchInput}
              />
            </form>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Repository</th>
                  <th>Zip File</th>
                  <th>Commit Message</th>
                  <th>Show More</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {data[0] !== "empty" &&
                  currentItems
                    .filter((item) => {
                      return searchInput.toLowerCase() === ""
                        ? item
                        : item.repository_name
                            .toLowerCase()
                            .includes(searchInput);
                    })
                    .map((row, rowIndex) => (
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
                        <td>
                          <button
                            className="button-know-more"
                            onClick={() => handleDownload([row])}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </>
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
      <div className="table-container">
        <div className="graph">
          <ul className="months">
            <li>Jan</li>
            <li>Feb</li>
            <li>Mar</li>
            <li>Apr</li>
            <li>May</li>
            <li>Jun</li>
            <li>Jul</li>
            <li>Aug</li>
            <li>Sep</li>
            <li>Oct</li>
            <li>Nov</li>
            <li>Dec</li>
          </ul>
          <ul className="days">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="squares">{squareli}</ul>
        </div>
      </div>
    </>
  );
}

export default BackupRepo;
