import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, RouterProvider } from "react-router-dom";
import userContext from "./Components/Custom Hooks/userContext";
import { useContext } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <>
    <HashRouter>
    <App />
  </HashRouter>
  </>
);


reportWebVitals();