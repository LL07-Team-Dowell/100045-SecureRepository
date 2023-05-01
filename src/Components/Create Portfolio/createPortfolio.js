import "./createPorfolio.css";
import { Text, Button } from "@nextui-org/react";

const CreatePortfolio = () => {
  return (
    <div className="create-portfolio">
      <Text
        h1
        css={{
          color: "#b9376d;",
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
        Oops! You do not have a Portfolio for Secure Repository!
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
        Please click on the below button to create a Portfolio
      </Text>
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
        <a href="https://100093.pythonanywhere.com/" target="blank">
          Click here
        </a>
      </Button>
    </div>
  );
};
export default CreatePortfolio;
