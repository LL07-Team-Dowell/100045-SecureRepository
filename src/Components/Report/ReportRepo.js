import React, { useState, useEffect } from "react";
import "./Table.css";
import Loader from "../Loader/Loader";
import { useContext } from "react";
import userContext from "../Custom Hooks/userContext";
import { Text } from "@nextui-org/react";

function ReportRepo() {
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
      `https://100045.pythonanywhere.com/reports/get-respository-reports/${org_id}/`
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
          <Loader />
        </div>
      );

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

// import React, { useState, useEffect, useMemo } from "react";
// import "./Table.css";
// import Loader from "../Loader/Loader";
// import { useContext } from "react";
// import userContext from "../Custom Hooks/userContext";
// import { Text } from "@nextui-org/react";
// import { useTable, usePagination } from "react-table";

// export default function ReportRepo() {
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedData, setSelectedData] = useState([]);
//   const { userInfo } = useContext(userContext);
//   const [portfolio] = userInfo?.portfolio_info?.filter(
//     (item) => item?.product === "Secure Repositories"
//   );

//   useEffect(() => {
//     getReport(portfolio.org_id);
//   }, []);

//   async function getReport(org_id) {
//     const data = await fetch(
//       `https://100045.pythonanywhere.com/reports/get-respository-reports/${org_id}/`
//     );
//     const dataJson = await data.json();
//     setData(dataJson.data);
//   }

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         accessor: (row, index) => index + 1,
//       },
//       {
//         Header: "Date of Registration",
//         accessor: "date_of_registration",
//       },
//       {
//         Header: "Repository Name",
//         accessor: "repository_name",
//       },
//       {
//         Header: "Show More",
//         accessor: (row) => (
//           <button
//             className="button-know-more"
//             onClick={() => handleTableClick([row])}
//           >
//             Show More
//           </button>
//         ),
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   const handleTableClick = (selected) => {
//     setSelectedData(selected);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedData([]);
//     setShowModal(false);
//   };

//   const renderSelectedTable = () => {
//     if (selectedData.length === 0) return null;

//     const [row] = selectedData;

//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={handleCloseModal}>
//             &times;
//           </span>

//           <table className="table">
//             <tbody>
//               <tr>
//                 <td>Repository Name </td>
//                 <td>{row.repository_name}</td>
//               </tr>
//               <tr>
//                 <td>Created By</td>
//                 <td>{row.created_by}</td>
//               </tr>
//               <tr>
//                 <td>Repository URL</td>
//                 <td>{row.repository_url}</td>
//               </tr>
//               <tr>
//                 <td>Date of Registration</td>
//                 <td>{row.date_of_registration}</td>
//               </tr>
//               <tr>
//                 <td>Time of Registration</td>
//                 <td>{row.time_of_registration}</td>
//               </tr>
//               <tr>
//                 <td>Web Hook Link</td>
//                 <td>{row.webhook_link}</td>
//               </tr>
//               <tr>
//                 <td>Data Type</td>
//                 <td>{row.data_type}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="table-container">
//       <Text
//         h1
//         css={{
//           color: "#1976d2",
//           fontSize: "1.5rem",

//           "@xs": {
//             fontSize: "2rem",
//           },
//           "@sm": {
//             fontSize: "2.5rem",
//           },
//           "@md": {
//             fontSize: "3rem",
//           },
//           "@lg": {
//             fontSize: "4rem",
//           },
//           "@xl": {
//             fontSize: "5rem",
//           },
//         }}
//         weight="bold"
//       >
//         Repository Reports
//       </Text>

//       {data.length === 0 ? <div className="loader-container">
//           <Loader />
//         </div>  : <table className="table" {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//               prepareRow(row);
//               return (
//                 <tr className="tabdata" {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>  }

//       {showModal && (
//         <div className="modal" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <table className="table">
//               <tbody>
//                 {selectedData.map((row) => (
//                   <div>
//                   <tr key={row.id}>
//                     <td>Repository Name</td>
//                     <td>{row.repository_name}</td>
//                   </tr>
//                   <tr key={row.id + "created-by"}>
//                     <td>Created By</td>
//                     <td>{row.created_by}</td>
//                   </tr>
//                   <tr key={row.id + "url"}>
//                     <td>Repository URL</td>
//                     <td>{row.repository_url}</td>
//                   </tr>
//                   <tr key={row.id + "date"}>
//                     <td>Date of Registration</td>
//                     <td>{row.date_of_registration}</td>
//                   </tr>
//                   <tr key={row.id + "time"}>
//                     <td>Time of Registration</td>
//                     <td>{row.time_of_registration}</td>
//                   </tr>
//                   <tr key={row.id + "hook-link"}>
//                     <td>Web Hook Link</td>
//                     <td>{row.webhook_link}</td>
//                   </tr>
//                   <tr key={row.id + "data-type"}>
//                     <td>Data Type</td>
//                     <td>{row.data_type}</td>
//                   </tr>
//                   </div>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   )}

// import React, { useState, useEffect, useMemo } from "react";
// import "./Table.css";
// import Loader from "../Loader/Loader";
// import { useContext } from "react";
// import userContext from "../Custom Hooks/userContext";
// import { Text } from "@nextui-org/react";
// import { useTable, usePagination } from "react-table";

// export default function ReportRepo() {
//   const [data, setData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedData, setSelectedData] = useState([]);
//   const { userInfo } = useContext(userContext);
//   const [portfolio] = userInfo?.portfolio_info?.filter(
//     (item) => item?.product === "Secure Repositories"
//   );

//   useEffect(() => {
//     getReport(portfolio.org_id);
//   }, []);

//   async function getReport(org_id) {
//     const data = await fetch(
//       `https://100045.pythonanywhere.com/reports/get-respository-reports/${org_id}/`
//     );
//     const dataJson = await data.json();
//     setData(dataJson.data);
//   }

//   const columns = useMemo(
//     () => [
//       {
//         Header: "S.No",
//         accessor: (row, index) => index + 1,
//       },
//       {
//         Header: "Date of Registration",
//         accessor: "date_of_registration",
//       },
//       {
//         Header: "Repository Name",
//         accessor: "repository_name",
//       },
//       {
//         Header: "Show More",
//         accessor: (row) => (
//           <button
//             className="button-know-more"
//             onClick={() => handleTableClick([row])}
//           >
//             Show More
//           </button>
//         ),
//       },
//     ],
//     []
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
//     pageOptions, pageCount, pageIndex, gotoPage, nextPage, previousPage,
//     canPreviousPage, canNextPage } =
//       useTable({ columns, data }, usePagination);

//   const handleTableClick = (selected) => {
//     setSelectedData(selected);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedData([]);
//     setShowModal(false);
//   };

//   const renderSelectedTable = () => {
//     if (selectedData.length === 0) return null;

//     const [row] = selectedData;

//     return (
//       <div className="modal">
//         <div className="modal-content">
//           <span className="close" onClick={handleCloseModal}>
//             &times;
//           </span>

//           <table className="table">
//             <tbody>
//               <tr>
//                 <td>Repository Name </td>
//                 <td>{row.repository_name}</td>
//               </tr>
//               <tr>
//                 <td>Created By</td>
//                 <td>{row.created_by}</td>
//               </tr>
//               <tr>
//                 <td>Repository URL</td>
//                 <td>{row.repository_url}</td>
//               </tr>
//               <tr>
//                 <td>Date of Registration</td>
//                 <td>{row.date_of_registration}</td>
//               </tr>
//               <tr>
//                 <td>Time of Registration</td>
//                 <td>{row.time_of_registration}</td>
//               </tr>
//               <tr>
//                 <td>Web Hook Link</td>
//                 <td>{row.webhook_link}</td>
//               </tr>
//               <tr>
//                 <td>Data Type</td>
//                 <td>{row.data_type}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="table-container">
//       <Text
//         h1
//         css={{
//           color: "#1976d2",
//           fontSize: "1.5rem",

//           "@xs": {
//             fontSize: "2rem",
//           },
//           "@sm": {
//             fontSize: "2.5rem",
//           },
//           "@md": {
//             fontSize: "3rem",
//           },
//           "@lg": {
//             fontSize: "4rem",
//           },
//           "@xl": {
//             fontSize: "5rem",
//           },
//         }}
//         weight="bold"
//       >
//         Repository Reports
//       </Text>

//       {data.length === 0 ? <div className="loader-container">
//           <Loader />
//         </div>  : <table className="table" {...getTableProps()}>
//           <thead>
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//               prepareRow(row);
//               return (
//                 <tr className="tabdata" {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>  }

//       {showModal && (
//         <div className="modal" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <table className="table">
//               <tbody>
//                 {selectedData.map((row) => (
//                   <div>
//                   <tr key={row.id}>
//                     <td>Repository Name</td>
//                     <td>{row.repository_name}</td>
//                   </tr>
//                   <tr key={row.id + "created-by"}>
//                     <td>Created By</td>
//                     <td>{row.created_by}</td>
//                   </tr>
//                   <tr key={row.id + "url"}>
//                     <td>Repository URL</td>
//                     <td>{row.repository_url}</td>
//                   </tr>
//                   <tr key={row.id + "date"}>
//                     <td>Date of Registration</td>
//                     <td>{row.date_of_registration}</td>
//                   </tr>
//                   <tr key={row.id + "time"}>
//                     <td>Time of Registration</td>
//                     <td>{row.time_of_registration}</td>
//                   </tr>
//                   <tr key={row.id + "hook-link"}>
//                     <td>Web Hook Link</td>
//                     <td>{row.webhook_link}</td>
//                   </tr>
//                   <tr key={row.id + "data-type"}>
//                     <td>Data Type</td>
//                     <td>{row.data_type}</td>
//                   </tr>
//                   </div>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

// <div className="pagination">
//   <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//     Previous
//   </button>
//   <span>
//     Page{" "}
//     <strong>
//       {pageIndex + 1} of {pageOptions.length}
//     </strong>
//   </span>
//   <button onClick={() => nextPage()} disabled={!canNextPage}>
//     Next
//   </button>
// </div>
//     </div>
//   )}
