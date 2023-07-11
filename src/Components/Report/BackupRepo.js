import React, { useState, useEffect } from "react";
import "./Table.css";
import { useStateValue } from "../../Context/StateProvider";
import Popup from "../Popup/Popup";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import axios from "axios";

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
    console.log(row)
    const fileUrl= row[0].file_url
    const download = async (fileUrl) => {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "backup.zip");
      document.body.appendChild(link);
      link.click();
    };

    download();
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
              "Created By",
              "Commit URL",
            ].map((item) => (
              <p key={item}>{item}:</p>
            ))}
          </div>
          <div className="right">
            <p>{selectedData[0]?.backup_time}</p>
            {selectedData[0]?.added_file &&
            selectedData[0].added_file.length > 0 ? (
              // selectedData[0].added_file.map(item => <p>{item}</p>)
              <p>{selectedData[0].added_file[0]}</p>
            ) : (
              <p>No Added Files</p>
            )}
            {selectedData[0]?.modified_file &&
            selectedData[0].modified_file.length > 0 ? (
              <p>{selectedData[0].modified_file[0]}</p>
            ) : (
              <p>No modified Files</p>
            )}
            {selectedData[0]?.removed_file &&
            selectedData[0].removed_file.length > 0 ? (
              <p>{selectedData[0].removed_file[0]}</p>
            ) : (
              <p>No Deleted Files</p>
            )}
            <p>{selectedData[0]?.pusher}</p>
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
  );
}

export default BackupRepo;
