import { Link, json } from "react-router-dom";
import "./home.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar, ScatterChart, Scatter
} from "recharts";
import { useStateValue } from "../../Context/StateProvider";

export default function Home() {
  const [state] = useStateValue();
  const [portfolio] = state.user?.portfolio_info?.filter(
    (item) => item?.product === "Secure Repositories"
  );

  const data = [
    {
      name: "User A",
      uv: 4000,
      commits: 4,
      amt: 2400,
    },
    {
      name: "User B",
      uv: 3000,
      commits: 3,
      amt: 2210,
    },
    {
      name: "User C",
      uv: 2000,
      commits: 3,
      amt: 2290,
    },
    {
      name: "User D",
      uv: 2780,
      commits: 2,
      amt: 2000,
    },
    {
      name: "User E",
      uv: 1890,
      commits: 2,
      amt: 2181,
    },
    {
      name: "User F",
      uv: 2390,
      commits: 1,
      amt: 2500,
    },
  ];

  const data01 = [
    { name: "user A", value: 4 },
    { name: "user B", value: 3 },
    { name: "user C", value: 3 },
    { name: "user D", value: 2 },
    { name: "user E", value: 2 },
    { name: "user F", value: 1 },
  ];

  const Sdata = [
    { x: 10, y: 2, z: 20 },
    { x: 12, y: 1, z: 26},
    { x: 17, y: 3, z: 40 },
    { x: 14, y: 2, z: 28 },
    { x: 15, y: 4, z: 50 },
    { x: 11, y: 2, z: 20 },
  ];

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
          <select className="select" id="repository">
            <option value="volvo">repository 1</option>
            <option value="saab">Repository 2</option>
            <option value="mercedes">Repository 3</option>
            <option value="audi">Repository 4</option>
          </select>
        </div>

        <div className="container">
          <h3>No of Commits</h3>
          <p>
            No of Commits recorded:<b>3</b>
          </p>
        </div>
      </div>
      <div className="right">
        <div className="container">
          <h3>Pie Chart showing pushers in this repository</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#164B60"
              label
            />
            <Tooltip />
            <Legend />
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
