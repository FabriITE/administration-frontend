import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { API_URL } from "../../../constants";

export const useWebSocketConexion = (employeeId) => {
  const [socketInstance, setSocketInstance] = useState();
  
  useEffect(() => {

    // const socket = io("https://monitoring.itellum.com", {
    //   transports: ["websocket"],
    //   withCredentials: true,
    //   path: "/rrhh/socket.io",
    // });
    const socket = io(API_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");

      if (employeeId) {
        socket.emit("join_room", { employee_id: employeeId });
        console.log(` Entró al room ${employeeId}`);
      }
    });

    setSocketInstance(socket);

    return () => {
      if (employeeId) {
        socket.emit("leave_room", { employee_id: employeeId });
      }
      socket.disconnect();
    };
  }, [employeeId]);

  return [socketInstance];
};
