import { useContext, useEffect, useState } from "react";
import "./report.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Shimmer from "../Shimmer/shimmer";
import { Skeleton } from "@mui/material";


function createData(name, data) {
  return { name, data };
}

const Report = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    const data = await fetch(
      `https://100045.pythonanywhere.com/reports/get-respository-reports/64063b64efadad9c695ee232/`
    );
    const dataJson = await data.json();
    setReport(dataJson);
  }

  return !report ? (
    <div className="reports-container">
      <span className="text">Repository Report</span>
      {Array(1)
        .fill(" ")
        .map((item, index) => {
          const rows = [
            createData("Company ID", <Shimmer />),
            createData("Created By", <Shimmer />),
            createData("Data Type", <Shimmer />),
            createData("Date of Registration", <Shimmer />),
            createData("Function Name", <Shimmer />),
            createData("Event ID", <Shimmer />),
            createData("Organisation Name", <Shimmer />),
            createData("Registration Name", <Shimmer />),
            createData("Registration URL", <Shimmer />),
            createData("Time of Registration", <Shimmer />),
            createData("Webhook Link", <Shimmer />),
            createData("ID", <Shimmer />),
          ];

          return (
            <TableContainer component={Paper} key={index}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Repository Name</TableCell>
                    <TableCell align="right">{<Skeleton />}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.data}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        })}
    </div>
  ) : (
    <div className="reports-container">
      <h2 className="text">Repository Report</h2>

      {report.data.map((data) => {
        const rows = [
          createData("Company ID", data?.company_id),
          createData("Created By", data?.created_by),
          createData("Data Type", data?.data_type),
          createData("Date of Registration", data?.date_of_registration),
          createData("Function Name", data?.function_number),
          createData("Event ID", data?.eventId),
          createData("Organisation Name", data?.organisation_name),
          createData("Registration Name", data?.repository_name),
          createData("Registration URL", data?.repository_url),
          createData("Time of Registration", data?.time_of_registration),
          createData("Webhook Link", data?.webhook_link),
          createData("ID", data?._id),
        ];

        return (
          <TableContainer component={Paper} key={data._id}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      position: "sticky",
                      left: "0",
                    }}
                  >
                    Repository Name
                  </TableCell>
                  <TableCell align="right">{data.repository_name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        position: "sticky",
                        left: "0",
                        backgroundColor: "white",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
};

export default Report;
