import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import { useStateValue } from "../../Context/StateProvider";
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
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

export default function Home() {
  const [state] = useStateValue();
  const [repositoryData, setRepositoryData] = useState([]);
  const [datas, setData] = useState();
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState("");
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );
  const [chartData, setChartData] = React.useState([]);
  const [histogram, setHistogram] = React.useState([]);
  const [commitsByMonth, setCommitsByMonth] = useState({});

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-backup-reports/${portfolio.org_id}/`
        );
        if (response.data.data.length === 0) {
        } else {
          setData(response.data.data);

          const pusherCommits = {};
          response.data.data
            .filter((item) => item.repository_name === selectedRepository)
            .forEach((item) => {
              const { pusher } = item;
              if (pusherCommits[pusher]) {
                pusherCommits[pusher]++;
              } else {
                pusherCommits[pusher] = 1;
              }
            });

          const newData = Object.keys(pusherCommits).map((pusher) => ({
            name: pusher,
            value: pusherCommits[pusher],
            fill: "#" + Math.floor(Math.random() * 16777215).toString(16),
          }));

          setRepositoryData(newData);

          // Get all unique repository names for select input options
          const uniqueRepositoryNames = Array.from(
            new Set(response.data.data.map((item) => item.repository_name))
          );
          setRepositoryNames(uniqueRepositoryNames);
          // histogram logic
        }
      } catch (error) {
        console.error(error);
      }
      // Call the async function
    };
    fetchData();
  }, [portfolio.org_id, selectedRepository]);

  const handleSelectChange = (event) => {
    setSelectedRepository(event.target.value);
  };

  const getCommitsForRepository = (pusherName, repoName) => {
    let commits = 0;

    datas.forEach((item) => {
      const { name, repository_name } = item;
      if (name === pusherName && repository_name === repoName) {
        commits++;
      }
    });

    return commits;
  };

  // bar chart data
  // State to store the commits per month data
  React.useEffect(() => {
    if (!datas) return;
    const currentYear = new Date().getFullYear();

    // Filter data to include only commits from the current year
    const commitsThisYear = datas.filter((item) => {
      const itemYear = moment(item.backup_time).year();
      return (
        itemYear === currentYear && item.repository_name === selectedRepository
      );
    });

    // Count the number of commits per month
    const commitsPerMonth = Array(12).fill(0);
    commitsThisYear.forEach((item) => {
      const month = moment(item.backup_time).month();
      commitsPerMonth[month]++;
    });

    // Prepare the data for the bar chart
    const chartData = [
      { name: "January", commits: commitsPerMonth[0] },
      { name: "February", commits: commitsPerMonth[1] },
      { name: "March", commits: commitsPerMonth[2] },
      { name: "April", commits: commitsPerMonth[3] },
      { name: "May", commits: commitsPerMonth[4] },
      { name: "June", commits: commitsPerMonth[5] },
      { name: "July", commits: commitsPerMonth[6] },
      { name: "August", commits: commitsPerMonth[7] },
      { name: "September", commits: commitsPerMonth[8] },
      { name: "October", commits: commitsPerMonth[9] },
      { name: "November", commits: commitsPerMonth[10] },
      { name: "December", commits: commitsPerMonth[11] },
    ];
    setChartData(chartData);

    const commitsByMonth = datas?.reduce((acc, commit) => {
      const month = new Date(commit.backup_time).toLocaleString("default", {
        month: "long",
      });
      acc[month] = acc[month] || [];
      acc[month].push(commit);
      return acc;
    }, {});

    // Calculate the number of added, modified, and deleted files for each month
      const processedData =
        commitsByMonth !== null &&
        commitsByMonth !== undefined &&
        Object.entries(commitsByMonth).map(([month, commits]) => ({
          name: month,
          uv: commits.reduce(
            (total, commit) => total + commit.added_file.length,
            0
          ),
          pv: commits.reduce(
            (total, commit) => total + commit.modified_file.length,
            0
          ),
          qv: commits.reduce(
            (total, commit) => total + commit.removed_file.length,
            0
          ),
        }));

    setHistogram(processedData);
    console.log(histogram);
    }, [datas, selectedRepository]);
    

  return (
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
        </div>

        <div className="container">
          <h3>Please select Repository to view Insights On</h3>
          <label htmlFor="repository">Choose a repository: </label>
          <select value={selectedRepository} onChange={handleSelectChange}>
            {/* <option value="">select a repository</option> */}
            {repositoryNames.map((repoName) => (
              <option key={repoName} value={repoName}>
                {repoName}
              </option>
            ))}
          </select>
        </div>

        <div className="container-pie bar">
          <h3>Pie Chart showing pushers in this repository</h3>
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
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="right">
        <div className="container bar">
          <h3>Bar chart showing commits by different contributors</h3>
          <ResponsiveContainer width="100%" height={300}>
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
        </div>
        <div className="container bar">
          <h3>
            Histogram - commit sizes vs distribution of commits across time
            periods
          </h3>
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
        </div>

        {/* <p>Stacked Bar chart - features vs contributors</p>
        <p>Heat Map present</p>
        <p>
          {" "}
          Bubble chart- Visualize commit activity (number and size) vs time made
        </p> */}
      </div>
    </div>
  );
}



