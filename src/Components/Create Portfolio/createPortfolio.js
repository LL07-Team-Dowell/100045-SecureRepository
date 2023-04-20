import "./createPorfolio.css"
import { profileUrl } from "../Constants/constant";

const CreatePortfolio = () => {
  return (
    <div className = "create-portfolio">
      <h2>You do not have a Portfolio for Secure Repositories. </h2>
      <h3>Please click on the below button to create a Portfolio.</h3>
      <button>
        <a href="https://100093.pythonanywhere.com/" target="blank">Click here</a>
      </button>
    </div>
  );
};
export default CreatePortfolio;
