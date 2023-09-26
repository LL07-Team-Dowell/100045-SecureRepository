import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import { useStateValue } from "../../Context/StateProvider";
import Select from "react-select";
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

export default function Home(props) {
  const [state] = useStateValue();
  const [data, setData] = useState([]);
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [userRepositoryNames, setUserRepositoryNames] = useState([]);
  const [allpushers, setAllPushers] = useState([]);
  const [pushers, setPushers] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [selectedUserRepository, setSelectedUserRepository] = useState();
  const [selectedPushers, setSelectedPushers] = useState();
  const [repositoryData, setRepositoryData] = useState([]);
  const [repositoryUserData, setRepositoryUserData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartUserData, setChartUserData] = useState([]);
  const [histogram, setHistogram] = useState([]);
  const [userHistogram, setUserHistogram] = useState([]);
  const [toggle, setToggle] = useState("repository");
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-statistics/${portfolio.org_id}/`
        );
        if (response.data.data.length === 0) {
          console.log("error");
        } else {
          setData(response.data.data);

          // Get all unique repository names for select input options
          const uniqueRepositoryNames = Array.from(
            new Set(response.data.data.map((item) => item.repository_name))
          );

          const allPushers = response.data.data.reduce((pushers, item) => {
            const metadata = item.metadata;
            if (metadata && Array.isArray(metadata)) {
              metadata.forEach((meta) => {
                const pusher = meta.pusher;
                if (pusher && !pushers.includes(pusher)) {
                  pushers.push(pusher);
                }
              });
            }
            return pushers;
          }, []);

          setAllPushers(allPushers);

          setAllPushers(allPushers);
          setRepositoryNames(uniqueRepositoryNames);
        }
      } catch (error) {
        console.error(error);
      }
      // Call the async function
    };
    fetchData();
  }, [portfolio.org_id]);

  const handleSelectChange = (selectedRepository) => {
    setSelectedRepository(selectedRepository);
    setSelectedPushers(null);
  };

  const handlePusherChange = (selectedPushers) => {
    setSelectedPushers(selectedPushers);
  };

  const handleUserChange = (selectedUser) => {
    setSelectedUser(selectedUser);
    setSelectedUserRepository(null);
  };

  React.useEffect(() => {
    if (data.length > 0 && selectedUser) {
      // pie chart logic - userID loop

      const pusherCommits = {};
      data.forEach((item) => {
        const repositoryName = item.repository_name;
        const metadata = item.metadata;

        if (metadata && Array.isArray(metadata)) {
          metadata.forEach((meta) => {
            const pusher = meta.pusher;
            if (pusher) {
              if (!pusherCommits[pusher]) {
                pusherCommits[pusher] = {};
              }
              if (!pusherCommits[pusher][repositoryName]) {
                pusherCommits[pusher][repositoryName] = 1;
              } else {
                pusherCommits[pusher][repositoryName]++;
              }
            }
          });
        }
      });

      const commitCountsForTargetPusher = pusherCommits[selectedUser.label];

      // Initialize an empty array to store the commit counts as objects
      const commitCountsArray = [];

      // Check if the target pusher exists in the data
      if (commitCountsForTargetPusher) {
        // Convert the nested object into an array of objects
        for (const repositoryName in commitCountsForTargetPusher) {
          commitCountsArray.push({
            name: repositoryName,
            commits: commitCountsForTargetPusher[repositoryName],
            fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
          });
        }

        // Now, commitCountsArray contains the commit counts as an array of objects
      }

      // Now, pusherCommits object contains the number of commits for each pusher in each repository
      setChartUserData(commitCountsArray);

      const userRepositories = commitCountsArray.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setUserRepositoryNames(userRepositories);

      // USER BARCHART LOGIC
      const selectedItem = data
        .filter(
          (item) =>
            !selectedUserRepository ||
            item.repository_name === selectedUserRepository.label
        ) // Filter by selected repository
        .map((item) => {
          return {
            repository_name: item.repository_name,
            metadata: item.metadata.filter(
              (meta) => meta.pusher === selectedUser.label
            ),
          };
        });
      console.log(selectedItem);

      const commitCounts = Array(12).fill(0);

      selectedItem.forEach((item) => {
        item.metadata.forEach((meta) => {
          const month = moment(meta.data).month();

          if (!commitCounts[month]) {
            commitCounts[month] = 0;
          }

          commitCounts[month]++;
        });
      });

      // Prepare the data for the bar chart
      const chartData = [
        { name: "Jan", commits: commitCounts[0] },
        { name: "Feb", commits: commitCounts[1] },
        { name: "Mar", commits: commitCounts[2] },
        { name: "Apr", commits: commitCounts[3] },
        { name: "May", commits: commitCounts[4] },
        { name: "Jun", commits: commitCounts[5] },
        { name: "Jul", commits: commitCounts[6] },
        { name: "Aug", commits: commitCounts[7] },
        { name: "Sep", commits: commitCounts[8] },
        { name: "Oct", commits: commitCounts[9] },
        { name: "Nov", commits: commitCounts[10] },
        { name: "Dec", commits: commitCounts[11] },
      ];

      // Now, chartData contains the commits per month for the selected pusher in the selected repository

      setRepositoryUserData(chartData);

      // HISTOGRAM LOGIC
      // Check if selectedItem and selectedPushers are defined
      if (selectedUser) {
        const commitsByMonth = selectedItem.reduce((acc, commit) => {
          commit?.metadata.forEach((commit) => {
            if (commit?.pusher === selectedUser.label) {
              const month = new Date(commit?.data).toLocaleString("default", {
                month: "long",
              });
              acc[month] = acc[month] || { added: 0, modified: 0, removed: 0 };
              acc[month].added += commit.created_files;
              acc[month].modified += commit.modified_files;
              acc[month].removed += commit.removed_files;
            }
          });

          return acc;
        }, {});

        // Convert commitsByMonth into the desired format
        const processedData = Object.entries(commitsByMonth).map(
          ([month, commits]) => ({
            name: month,
            uv: commits.added,
            pv: commits.modified,
            qv: commits.removed,
          })
        );

        // processedData now contains the number of added, modified, and removed files per month
        console.log(`processed ${JSON.stringify(processedData)}`);
        setUserHistogram(processedData);
      } else {
        // Handle the case where selectedItem or selectedPushers is not defined
        console.log("No data available.");
      }
    }

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
        console.log(processedData);
        setHistogram(processedData);
      }
    }
  }, [
    selectedRepository,
    data,
    selectedPushers,
    selectedUser,
    selectedUserRepository,
  ]);

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

  console.log("hi");
  console.log("histogram" + userHistogram);

  return (
    <>
      <div className="tabs">
        <ul>
          <li
            className={toggle === "repository" ? "active" : ""}
            onClick={() => setToggle("repository")}
          >
            Search by repository
          </li>
          <li
            className={toggle === "user" ? "active" : ""}
            onClick={() => setToggle("user")}
          >
            Search by User ID
          </li>
        </ul>
      </div>
      {toggle === "repository" ? (
        <div className="home-container">
          <div className="left">
            <div className="container">
              <h1 className="title">Welcome to Secure Repository!</h1>
              <p className="message">
                Please click the 'Register' button to Secure your Repository
              </p>
              <Link to="/register">
                <button className="register-button">Register</button>
              </Link>
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
        <div className="home-container">
          <div className="left">
            <div className="container">
              {selectedUser && (
                <button
                  className="register-button"
                  onClick={() =>
                    exportPDF(
                      "pdf",
                      `Reports for ${
                        selectedUser.label +
                        " " +
                        new Date().toJSON().slice(0, 10).replace(/-/g, "/")
                      }`,
                      "home-container"
                    )
                  }
                  style={{ marginBottom: "20px" }}
                >
                  Download Page
                </button>
              )}
              <h3>Please select UserID to view Insights On</h3>
              <label htmlFor="repository" style={{ marginBottom: "20px" }}>
                Choose a user:{" "}
              </label>
              <Select
                options={allpushers.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
                value={selectedUser}
                onChange={handleUserChange}
              />
            </div>

            <div className="container-pie bar">
              <h3>
                Pie Chart showing{" "}
                {selectedUser?.label ? selectedUser.label : "userID"}
                {"'s "}
                contribution to different repositories
              </h3>
              {!selectedUser && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a User
                </h4>
              )}
              {selectedUser && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart style={{ position: "relative" }}>
                    <Pie
                      dataKey="commits"
                      isAnimationActive={false}
                      data={chartUserData}
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
                {selectedUser?.label ? selectedUser.label : "userID"} in{" "}
                {selectedUserRepository?.label
                  ? selectedUserRepository.label
                  : "different repositories"}
              </h3>
              {!selectedUser && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a repository
                </h4>
              )}
              <h4 style={{ marginTop: "50px" }}>Please select a repository</h4>
              <label htmlFor="repository">Choose a Repository: </label>
              <Select
                options={userRepositoryNames}
                value={selectedUserRepository}
                onChange={(selectedUserRepository) =>
                  setSelectedUserRepository(selectedUserRepository)
                }
              />

              {selectedUser && (
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  style={{ marginTop: "200px" }}
                >
                  <BarChart
                    data={repositoryUserData}
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
                Histogram showing file distributions by{" "}
                {selectedUser?.label ? selectedUser.label : "userID"} in{" "}
                {selectedUserRepository?.label
                  ? selectedUserRepository.label
                  : "different repositories"}
              </h3>
              {!selectedUser && (
                <h4 style={{ color: "red", fontWeight: "600" }}>
                  Please select a repository
                </h4>
              )}
              {selectedUser && (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width={500}
                    height={300}
                    data={userHistogram}
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
      )}
    </>
  );
}

//32 tasks
