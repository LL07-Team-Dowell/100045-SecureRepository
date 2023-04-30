import { Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-text-container">
      <Text
        h1
        size={60}
        css={{
          color: "#1976d2",
        }}
        weight="bold"
      >
        Welcome to Secure Repository!
      </Text>
      <Text
        h1
        size={60}
        css={{
          color: "#111827",
        }}
        weight="bold"
      >
        Please click the 'Register' button to Secure your Repository
      </Text>
      <Link to="register">
        {" "}
        <button id="button-79">Register</button>{" "}
      </Link>
    </div>
  );
}
