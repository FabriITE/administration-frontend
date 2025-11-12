import { Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import { routes } from "./models/routes";
import MenuDrawer from "./components/sideBar/MenuDrawer";
import AccountsReceivableView from "./views/accountsReceivableView/accountsReceivableView";
import { getSessionData } from "./utils/api";
import { LOGIN_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addSession } from "./features/session";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await getSessionData();
        dispatch(addSession(res.data));
        if (res.data.role != "admin") {
          window.location = "https://itellumsat.com/";
        }
      } catch (error) {
        console.log(error);
        window.location = LOGIN_URL;
      }
    };

    fetchSessionData();
  }, []);

  return (
    <>
      <div className="layoutContainer">
        <MenuDrawer></MenuDrawer>
        <Routes>
          <Route Component={<Outlet />} />
          <Route
            path={routes.accountsreceivable.route}
            element={<AccountsReceivableView />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
