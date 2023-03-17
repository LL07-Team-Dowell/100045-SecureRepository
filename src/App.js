import "./App.css";
import SideBar from "./Components/Sidebar/sidebar";
import { MainContent } from "./Components/Main/main";
import { WithMaterialUI } from "./Components/Registration/form";
import { createBrowserRouter, Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
}

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContent />,
      },
      {
        path: "/register",
        element: <WithMaterialUI />,
      },
    ],
  },
]);

export default App;
