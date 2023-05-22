import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <>
  <QueryClientProvider client = {queryClient} >
    <HashRouter>
    <App />
  </HashRouter>
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right"  />
  </QueryClientProvider>
  </>
);


reportWebVitals();
