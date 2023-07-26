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
} from "recharts";

export default function Home() {
  const [state] = useStateValue();
  const [repositoryData, setRepositoryData] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState("");
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [datas, setData] = useState();
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );

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

  const option = [];


  const data = [
    {
      name: "User A",
      uv: 4000,
      commits: 4,
      amt: 2400,
    },
  ];

  const Sdata = [{ x: 10, y: 2, z: 20 }];

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
            <option value="">select a repository</option>
            {repositoryNames.map((repoName) => (
              <option key={repoName} value={repoName}>
                {repoName}
              </option>
            ))}
          </select>
        </div>

        <div className="container">
          {selectedRepository ? (
            <div>
              <h3>Commit Data for {selectedRepository}</h3>
              {repositoryData.map((item) => (
                <div key={item.pusher}>
                  <p>
                    {item.pusher} committed{" "}
                    {selectedRepository === item.pusher
                      ? getCommitsForRepository(item.pusher, selectedRepository)
                      : item.value}{" "}
                    times
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Please select a repository</p>
          )}
        </div>
      </div>
      <div className="right">
        <div className="container">
          <h3>Pie Chart showing pushers in this repository</h3>
          <PieChart
            width={500}
            height={300}
            style={{position: "relative" }}
          >
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
            <Legend layout="vertical" verticalAlign="top" align="right"/>
          </PieChart>
        </div>
        <div className="container">
          <h3>Bar chart showing commits by different contributors</h3>
          <BarChart
            width={500}
            height={300}
            data={data}
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
        </div>
        <div className="container">
          <h3>Scatter plot showing commit size vs commit frequency</h3>
          <ScatterChart
            width={500}
            height={300}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="stature" unit="files" />
            <YAxis type="number" dataKey="y" name="weight" unit="times" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter
              name="commit size vs commit frequency"
              data={Sdata}
              fill="#164B60"
            />
          </ScatterChart>
        </div>
        <p>
          Histogram - commit sizes vs distrobution of commits across time
          periods
        </p>
        <p>Stacked Bar chart - features vs contributors</p>
        <p>Heat Map present</p>
        <p>
          {" "}
          Bubble chart- Visualize commit activity (number and size) vs time made
        </p>
      </div>
    </div>
  );
}
