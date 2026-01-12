import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "../notifications/useNotifications";

export const useWebSocket = (socketInstance, employeeId) => {
  const dispatch = useDispatch();
  const { fetchNotifications } = useNotifications();
  const employee_id = useSelector((state) => state.session?.employee_id);
    
  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.on("connect", () => {
      console.log("WebSocket conectado");
    });

    socketInstance.on("disconnect", () => {
      console.log("WebSocket desconectado");
    });

    socketInstance.on("newNotification", (data) => {
      console.log("Nueva notificación:");
      fetchNotifications(employee_id);
    });

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.off("newNotification");
    };
  }, [socketInstance, employeeId, fetchNotifications, dispatch]);
};
