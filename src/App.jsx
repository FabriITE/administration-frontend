import { Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import { routes } from "./models/routes";
import MenuDrawer from "./components/sideBar/MenuDrawer";
import AccountsReceivableView from "./views/accountsReceivableView/accountsReceivableView";
import { getSessionData } from "./utils/api";
import { LOGIN_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addSession } from "./features/session";
import { useEffect } from "react";
import ClientHistoryView from "./views/clientHistory/ClientHistoryView";
import { useNotifications } from "./hooks/notifications/useNotifications";
import { useWebSocketConexion } from "./hooks/websocket/useWebSocketConnetion";
import { useWebSocket } from "./hooks/websocket/useWebsocket";

function App() {
  const dispatch = useDispatch();
  const employeesId = useSelector((state) => state.session.employee_id);
  const [socketInstance] = useWebSocketConexion(employeesId);
  const webSocket = useWebSocket(socketInstance);
  const { fetchNotifications } = useNotifications();

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

  useEffect(() => {
    fetchNotifications(employeesId);
  }, [employeesId]);

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
          <Route
            path={`${routes.clientHistory.parentRoute}/${routes.clientHistory.route}`}
            element={<ClientHistoryView />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
