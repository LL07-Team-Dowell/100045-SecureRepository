import "./createPorfolio.css";
import { Text } from "@nextui-org/react";

const CreatePortfolio = () => {
  return (
    <div className="create-portfolio">
      <Text
        h1
        size={50}
        css={{
          color: "#c94238",
        }}
        weight="bold"
      >
        Oops! You do not have a Portfolio for Secure Repository
      </Text>
      <Text
        h1
        size={35}
        css={{
          color: "#3271a8",
        }}
        weight="bold"
      >
        Please click on the below button to create a Portfolio
      </Text>

      <button id="button-79">
        <a href="https://100093.pythonanywhere.com/" target="blank">
          Click here
        </a>
      </button>
    </div>
  );
};
export default CreatePortfolio;
