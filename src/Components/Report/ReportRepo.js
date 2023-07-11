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
          // setData(response.data.data);
          setData([
        {
            "_id": "649865ebe980cfedbc42c7b7",
            "eventId": "FB1010000000000000000000003004",
            "function_number": "123456",
            "repository_name": "1-example-repo",
            "repository_url": "https://github.com/Halima-Ali/123456-example-repo.git",
            "organisation_name": "HalimaAliWario",
            "company_id": "6458e0dc872f46db5b4e113b",
            "data_type": "Real_Data",
            "created_by": "HalimaAliWario",
            "date_of_registration": "25-06-2023",
            "time_of_registration": "21:36:03",
            "webhook_link": "https://100045.pythonanywhere.com/backup/6458e0dc872f46db5b4e113b/123456-example-repo/"
        },
        {
            "_id": "6498661154a26620563d30b1",
            "eventId": "FB1010000000000000000000003004",
            "function_number": "123456",
            "repository_name": "2-example-repo",
            "repository_url": "https://github.com/Halima-Ali/123456-example-repo.git",
            "organisation_name": "HalimaAliWario",
            "company_id": "6458e0dc872f46db5b4e113b",
            "data_type": "Real_Data",
            "created_by": "HalimaAliWario",
            "date_of_registration": "25-06-2023",
            "time_of_registration": "21:36:41",
            "webhook_link": "https://100045.pythonanywhere.com/backup/6458e0dc872f46db5b4e113b/123456-example-repo/"
        },
        {
            "_id": "649ebbb970e608774bacfa22",
            "eventId": "FB1010000000000000000000003004",
            "function_number": "123456",
            "repository_name": "3-example-repo",
            "repository_url": "https://github.com/Halima-Ali/123456-example-repo.git",
            "organisation_name": "HalimaAliWario",
            "company_id": "6458e0dc872f46db5b4e113b",
            "data_type": "Real_Data",
            "created_by": "HalimaAliWario",
            "date_of_registration": "30-06-2023",
            "time_of_registration": "16:55:45",
            "webhook_link": "https://100045.pythonanywhere.com/backup/6458e0dc872f46db5b4e113b/123456-example-repo/"
        },
        {
            "_id": "64a17b03275cce369adb6d17",
            "eventId": "FB1010000000000000000000003004",
            "function_number": "123456",
            "repository_name": "4-example-repo",
            "repository_url": "https://github.com/Halima-Ali/123456-example-repo.git",
            "organisation_name": "HalimaAliWario",
            "company_id": "6458e0dc872f46db5b4e113b",
            "data_type": "Real_Data",
            "created_by": "HalimaAliWario",
            "date_of_registration": "02-07-2023",
            "time_of_registration": "18:56:27",
            "webhook_link": "https://100045.pythonanywhere.com/backup/6458e0dc872f46db5b4e113b/123456-example-repo/"
        },
        {
            "_id": "64a5653ae63718e644c1dda1",
            "eventId": "FB1010000000000000000000003004",
            "function_number": "123456",
            "repository_name": "5-example-repo",
            "repository_url": "https://github.com/Halima-Ali/123456-example-repo.git",
            "organisation_name": "HalimaAliWario",
            "company_id": "6458e0dc872f46db5b4e113b",
            "data_type": "Real_Data",
            "created_by": "HalimaAliWario",
            "date_of_registration": "05-07-2023",
            "time_of_registration": "18:12:34",
            "webhook_link": "https://100045.pythonanywhere.com/backup/6458e0dc872f46db5b4e113b/123456-example-repo/"
        }
    ])
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

    console.log(searchInput)
  }

  return (
    <div className="table-container">
      <h3>Repository Reports</h3>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className="content">
          <div className="left">
            {[
              "Repository Name",
              "Repository url",
              "Created_by",
              "Date of Registration",
              "Time of Registration",
              "Web Hook Link",
              "Data Type",
            ].map((item) => (
              <p key={item}>{item}:</p>
            ))}
          </div>
          <div className="right">
            <p>{selectedData[0]?.repository_name}</p>
            <p>{selectedData[0]?.repository_url}</p>
            <p>{selectedData[0]?.created_by}</p>
            <p>{selectedData[0]?.date_of_registration}</p>
            <p>{selectedData[0]?.time_of_registration}</p>
            <p>{selectedData[0]?.webhook_link}</p>
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
              placeholder="search repository"
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
                      : item.repository_name.toLowerCase().includes(
                          searchInput
                        );
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
