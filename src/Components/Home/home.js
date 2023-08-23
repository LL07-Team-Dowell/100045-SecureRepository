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

export default function Home() {
  const [state] = useStateValue();
  const [data, setData] = useState([]);
  const [repositoryNames, setRepositoryNames] = useState([]);
  const [pushers, setPushers] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState();
  const [selectedPushers, setSelectedPushers] = useState();
  const [repositoryData, setRepositoryData] = useState([]);
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );

  React.useEffect(() => {
    // Use useEffect to make the API call and update data state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://100045.pythonanywhere.com/reports/get-statistics/6385c0f18eca0fb652c94561/`
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

          if (uniqueRepositoryNames.length > 0) {
            setSelectedRepository([
              {
                label: uniqueRepositoryNames[0],
                value: uniqueRepositoryNames[0],
              },
            ]);
          }
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
  }

  React.useEffect(() => {
    if (data.length > 0 && selectedRepository) {
      const selectedItem = data.find(
        (item) => item.repository_name === selectedRepository.label
      );

    const uniquePusherNames = Array.from(
      new Set(
        selectedItem?.metadata.map((item) => item.pusher)
      )
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
      }
    }
  }, [selectedRepository, data]);

     
    console.log(repositoryData);
    console.log("hi")

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
          <Select
            options={repositoryNames.map((opt) => ({ label: opt, value: opt }))}
            value={selectedRepository}
            onChange={handleSelectChange}
          />
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
              <Legend layout ="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="right">
        <div className="container bar">
          <h3>Bar chart showing commits by different contributors</h3>
          <h4 style={{ marginTop: "50px" }}>
            Please select a contributor in this repository
          </h4>
          <label htmlFor="repository">Choose a Pusher: </label>
          <Select
            options={pushers.map((opt) => ({ label: opt, value: opt }))}
            value={selectedPushers}
            onChange={handlePusherChange}
          />
        </div>
        <div className="container bar">
          <h3>
            Histogram - commit sizes vs distribution of commits across time
            periods
          </h3>
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
