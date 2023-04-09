import { useEffect, useState } from "react";
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

const Backup = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    getReport();
  }, []);

  async function getReport() {
    const data = await fetch(
      `https://100045.pythonanywhere.com/reports/get-backup-reports/64063b64efadad9c695ee232/`
    );
    const dataJson = await data.json();
    setReport(dataJson);
  }

  return !report ? (
    <div className="reports-container">
      <span className="text">Backup Report</span>
      {Array(1)
        .fill(" ")
        .map((item, index) => {
          const rows = [
            createData("ID", <Shimmer />),
            createData("Company ID", <Shimmer />),
            createData("Event ID", <Shimmer />),
            createData("Function Name", <Shimmer />),
            createData("Zip File Name", <Shimmer />),
            createData("Backup Date", <Shimmer />),
            createData("Backup Time", <Shimmer />),
          ];

          return (
            <TableContainer component={Paper} key={index}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Backup Report</TableCell>
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
      <h2 className="text">Backup Report</h2>

      {report.data.map((data, index) => {
        const rows = [
          createData("ID", data?._id),
          createData("Company ID", data?.company_id),
          createData("Event ID", data?.eventId),
          createData("Function Name", data?.function_number),
          createData("Zip File Name", data?.zip_file_name),
          createData("Backup Date", data?.backup_date),
          createData("Backup Time", data?.backup_time),
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
                    Backup Report
                  </TableCell>
                  <TableCell align="right">{index+1}</TableCell>
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

export default Backup;
