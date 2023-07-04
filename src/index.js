import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./Context/StateProvider";
import { initialState } from "./Context/Reducer";
import reducer from "./Context/Reducer";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <HashRouter>
        <App />
      </HashRouter>
    </StateProvider>
  </React.StrictMode>
);
