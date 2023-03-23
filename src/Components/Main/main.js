import "./main.css";
import { useSearchParams } from "react-router-dom";

export const MainContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(useSearchParams());
  return (
    <>
      <h2 className="main-content">
        Welcome to our GitHub Backup Application. Click on the Register
        Repository Button to Continue
      </h2>
    </>
  );
};
