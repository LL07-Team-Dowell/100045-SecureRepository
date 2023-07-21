import React, { useState, useEffect } from "react";
import "./Table.css";
import { useStateValue } from "../../Context/StateProvider";
import Popup from "../Popup/Popup";
import Loader from "../Loader/Loader";

import axios from "axios";

function ReportRepo() {
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
          `https://100045.pythonanywhere.com/reports/get-respository-reports/${portfolio.org_id}/`
        );
        if (response.data.data.length === 0) {
          setData(["empty"]);
        } else {
          setData(response.data.data);
        }
      } catch (error) {
        console.error(error);
        // Handle the error
      }
    };

    fetchData(); // Call the async function
  }, [portfolio.org_id]);

  // console.log(`data ${JSON.stringify(data)}`);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  function handleClick(row) {
    setButtonPopup(true);
    setSelectedData(row);
    console.log(selectedData);
  }

  function handleChange(event) {
    const {value } = event.target;

    setSearchInput((prev) => value);
  }

  return (
    <div className="table-container">
      <h3>Repository Reports</h3>
      <input className="pagecontrol" placeholder="rows" type="number" max={10} min={4} value={itemsPerPage} name="itemsPerPage" onChange={(event) => itemsPerPage && setItemsPerPage(event.target.value)}/>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} copy={false}>
        <div className="content">
          <div className="row">
            <h3>Repository Name</h3>
            <p>{selectedData[0]?.repository_name}</p>
          </div>
          <div className="row">
            <h3>Repository url</h3>
            <p>{selectedData[0]?.repository_url}</p>
          </div>
          <div className="row">
            <h3>Created_by</h3>
            <p>{selectedData[0]?.created_by}</p>
          </div>
          <div className="row">
            <h3>Date of Registration</h3>
            <p>{selectedData[0]?.date_of_registration}</p>
          </div>
          <div className="row">
            <h3>Time of Registration</h3>
            <p>{selectedData[0]?.time_of_registration}</p>
          </div>
          <div className="row">
            <h3>Web Hook Link</h3>
            <p>{selectedData[0]?.webhook_link}</p>
          </div>
          <div className="row">
            <h3>Data Type</h3>
            <p>{selectedData[0]?.data_type}</p>
          </div>
          </div>
      </Popup>
      {data.length === 0 ? (
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
                <th>Date of Registration</th>
                <th>Repository Name</th>
                <th>Show More</th>
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
                      <td>{row.date_of_registration}</td>
                      <td>{row.repository_name}</td>
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

export default ReportRepo;
