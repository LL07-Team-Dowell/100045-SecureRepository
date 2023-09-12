import React from "react";
import axios from "axios";
import "../Home/home.css";
import Select from "react-select";
import Loader from "../Loader/Loader";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function ViewPublic() {
  const queryParams = new URLSearchParams(window.location.search);
  const qr_idParams = queryParams.get("qr_id");
  const company_idParams = queryParams.get("company_id");
  const [masterData, setMasterData] = React.useState([]);
  const [qrData, setQrData] = React.useState();
  const [expired, setExpired] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [repositoryNames, setRepositoryNames] = React.useState([]);
  const [selectedRepository, setSelectedRepository] = React.useState();
  const [selectedPushers, setSelectedPushers] = React.useState();
  const [repositoryData, setRepositoryData] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [histogram, setHistogram] = React.useState([]);
  const [pushers, setPushers] = React.useState([]);

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state

    const fetchMasterLinks = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/generate-master-link/${company_idParams}/?type=master_link_details`
        );
        if (response.data === 0) {
          console.log("error");
        } else {
          console.log(response.data);
          setMasterData(response.data?.qr_ids);
          let match = response.data?.qr_ids
            .map((item) => {
              if (item.qr_ids.includes(qr_idParams)) {
                return item;
              }
              return null;
            })
            .filter((item) => item);
          setQrData(match);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-statistics/${company_idParams}/`
        );
        if (response.data.data.length === 0) {
          console.log("error");
        } else {
          setData(response.data.data);

          // Get all unique repository names for select input options
          const uniqueRepositoryNames = Array.from(
            new Set(response.data.data.map((item) => item.repository_name))
          );

          setRepositoryNames(uniqueRepositoryNames);
        }
      } catch (error) {
        console.error(error);
      }
      // Call the async function
    };
    fetchData();

    fetchMasterLinks();

    setTimeout(() => {
      setExpired(true);
    }, 7000);
  }, [company_idParams , qr_idParams]);

  const handleSelectChange = (selectedRepository) => {
    setSelectedRepository(selectedRepository);
    setSelectedPushers(null);
  };

  const handlePusherChange = (selectedPushers) => {
    setSelectedPushers(selectedPushers);
  };

  React.useEffect(() => {
    if (data.length > 0 && selectedRepository) {
      const selectedItem = data.find(
        (item) => item.repository_name === selectedRepository.label
      );

      const uniquePusherNames = Array.from(
        new Set(selectedItem?.metadata.map((item) => item.pusher))
      );

      setPushers(uniquePusherNames);
      // pie chart logic

      if (selectedItem) {
        const commitsByPusher = {};
        selectedItem.metadata.forEach((commit) => {
          const pusher = commit.pusher;
          if (commitsByPusher[pusher]) {
            commitsByPusher[pusher]++;
          } else {
            commitsByPusher[pusher] = 1;
          }
        });

        const commitsPerPusherData = Object.entries(commitsByPusher).map(
          ([pusher, commits]) => ({
            name: pusher,
            value: commits,
            fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
          })
        );

        setRepositoryData(commitsPerPusherData);

        // bar chart logic
        const currentYear = new Date().getFullYear();
        const commitsThisYear = selectedItem?.metadata?.filter((item) => {
          const itemYear = moment(item.data).year();

          if (selectedPushers) {
            return (
              itemYear === currentYear && item.pusher === selectedPushers?.label
            );
          } else {
            return itemYear === currentYear;
          }
        });

        // Count the number of commits per month
        const commitsPerMonth = Array(12).fill(0);
        commitsThisYear.forEach((item) => {
          const month = moment(item.data).month();
          commitsPerMonth[month]++;
        });

        // Prepare the data for the bar chart
        const chartData = [
          { name: "Jan", commits: commitsPerMonth[0] },
          { name: "Feb", commits: commitsPerMonth[1] },
          { name: "Mar", commits: commitsPerMonth[2] },
          { name: "Apr", commits: commitsPerMonth[3] },
          { name: "May", commits: commitsPerMonth[4] },
          { name: "Jun", commits: commitsPerMonth[5] },
          { name: "Jul", commits: commitsPerMonth[6] },
          { name: "Aug", commits: commitsPerMonth[7] },
          { name: "Sep", commits: commitsPerMonth[8] },
          { name: "Oct", commits: commitsPerMonth[9] },
          { name: "Nov", commits: commitsPerMonth[10] },
          { name: "Dec", commits: commitsPerMonth[11] },
        ];
        setChartData(chartData);

        // histogram logic
        const commitsByMonth = (
          selectedPushers
            ? selectedItem?.metadata.filter(
                (item) => item.pusher === selectedPushers?.label
              )
            : selectedItem?.metadata
        ).reduce((acc, commit) => {
          const month = new Date(commit.data).toLocaleString("default", {
            month: "long",
          });
          acc[month] = acc[month] || [];
          acc[month].push(commit);
          return acc;
        }, {});

        const processedData =
          commitsByMonth !== null &&
          commitsByMonth !== undefined &&
          Object.entries(commitsByMonth).map(([month, commits]) => ({
            name: month,
            uv: commits.reduce(
              (total, commit) => total + commit.created_files,
              0
            ),
            pv: commits.reduce(
              (total, commit) => total + commit.modified_files,
              0
            ),
            qv: commits.reduce(
              (total, commit) => total + commit.removed_files,
              0
            ),
          }));

        setHistogram(processedData);
      }
    }
  }, [selectedRepository, data, selectedPushers]);

  const exportPDF = (type, name, element) => {
    html2canvas(document.querySelector(`.${element}`)).then((canvas) => {
      let dataURL = canvas.toDataURL("image/png");

      if (type === "pdf") {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "in",
          format: [21, 15],
        });

        pdf.addImage(dataURL, "PNG", 0.6, 0.6);
        pdf.save(`${name}.pdf`);
      } else if (type === "png") {
        const link = document.createElement("a");
        link.download = `${name}.png`;
        link.href = dataURL;
        link.click();
      }
    });
  };

  return (
    <div
      style={{
        position: "relative",
        top: "100px",
        margin: "20px auto",
      }}
    >
      {masterData.length > 0 ? (
        <div className="home-container">
          <div className="left">
            <div className="container">
              <h1 className="title">Welcome to Secure Repository!</h1>
              <p className="message">View your statistics</p>
              {selectedRepository && (
                <button
                  className="register-button"
                  onClick={() =>
                    exportPDF(
                      "pdf",
                      `Reports for ${
                        selectedRepository.label +
                        " " +
                        new Date().toJSON().slice(0, 10).replace(/-/g, "/")
                      }`,
                      "home-container"
                    )
                  }
                >
                  Download Page
                </button>
              )}
            </div>

            <div className="container">
              <h3>Please select Repository to view Insights On</h3>
              <label htmlFor="repository" style={{ marginBottom: "20px" }}>
                Choose a repository:{" "}
              </label>
              <Select
                options={repositoryNames.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
                value={selectedRepository}
                onChange={handleSelectChange}
              />
            </div>

            <div className="container-pie bar">
              <h3>Pie Chart showing pushers in this repository</h3>
              {!selectedRepository && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a repository
                </h4>
              )}
              {selectedRepository && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart style={{ position: "relative" }}>
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={repositoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#164B60"
                      label
                    />
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          <div className="right">
            <div className="container bar">
              <h3>
                Bar chart showing commits by{" "}
                {selectedPushers?.label
                  ? selectedPushers.label
                  : "different contributors"}
              </h3>
              {!selectedRepository && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a repository
                </h4>
              )}
              <h4 style={{ marginTop: "50px" }}>
                Please select a contributor in this repository
              </h4>
              <label htmlFor="repository">Choose a Pusher: </label>
              <Select
                options={pushers.map((opt) => ({ label: opt, value: opt }))}
                value={selectedPushers}
                onChange={handlePusherChange}
              />

              {selectedRepository && (
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  style={{ marginTop: "200px" }}
                >
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <XAxis
                      dataKey="name"
                      scale="point"
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar
                      dataKey="commits"
                      fill="#164B60"
                      background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="container bar histogram">
              <h3>
                Histogram file distribution by{" "}
                {selectedPushers?.label
                  ? selectedPushers.label
                  : "different contributors"}
              </h3>
              {!selectedRepository && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a repository
                </h4>
              )}
              {selectedRepository && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width={500}
                    height={300}
                    data={histogram}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                      layout="horizontal"
                      align="center"
                      verticalAlign="bottom"
                    />
                    <Bar dataKey="uv" fill="#164B60" name="Added Files" />
                    <Bar dataKey="pv" fill="orange" name="Modified Files" />
                    <Bar dataKey="qv" fill="red" name="Deleted Files" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {!expired && <Loader />}
          {expired && (
            <p>
              The link is expired. please contact owner for correct Link details
            </p>
          )}
        </>
      )}
    </div>
  );
}
