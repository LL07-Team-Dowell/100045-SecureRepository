import "./App.css";
import SideBar from "./Components/Sidebar/sidebar";
import { MainContent } from "./Components/Main/main";
import { WithMaterialUI } from "./Components/Registration/form";
import { createBrowserRouter, Outlet } from "react-router-dom";
import UseDowellLogin from "./Components/Login/login2";
import Portfolio from "./Components/Portfolio/portfolio";

function App() {
  return (
    <>
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
        element: <UseDowellLogin />,
      },
      {
        path: "/100045-SecureRepository",
        element: <SideBar/>,
        children:[
          {
            path:'register',
            element : <WithMaterialUI/>
          }
        ]
      },
      {
        path: "/100045-SecureRepository/portfolio",
        element: <Portfolio />,
      },
    ],
  },
]);

export default App;
