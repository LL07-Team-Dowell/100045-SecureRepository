import { Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Button, Spacer } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="home-text-container">
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
        Welcome to Secure Repository!
      </Text>
      <Text
        h1
        css={{
          color: "#111827",
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
        Please click the 'Register' button to Secure your Repository
      </Text>
      <Link to="register" id="btn-primary-link">
        {" "}
        {/* <button id="button-79">Register</button>{" "} */}
        <Button
          color="primary"
          auto
          weight="bold"
          css={{
            "@xs": {
              fontSize: "0.8rem",
              padding: "1.2em 2em",
            },
            "@sm": {
              fontSize: "1rem",
              padding: "1.2em 2em",
            },
            "@md": {
              fontSize: "1.3rem",
              padding: "1.2em 2em",
            },
            "@lg": {
              fontSize: "1.7rem",
              padding: "1.2em 2em",
            },
            "@xl": {
              fontSize: "2.0rem",
              padding: "1.2em 2em",
            },
          }}
        >
          Register
        </Button>
      </Link>
    </div>
  );
}
