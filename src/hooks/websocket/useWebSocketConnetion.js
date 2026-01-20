import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { API_URL } from "../../../constants";

export const useWebSocketConexion = () => {
  const [socketInstance, setSocketInstance] = useState();

  useEffect(() => {
    // const socket = io("https://monitoring.itellum.com", {
    //   transports: ["websocket"],
    //   withCredentials: true,
    //   path: "/rrhh/socket.io",
    // });
    const socket = io(API_URL, {
      transports: ["polling", "websocket"],
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor WebSocket");
    });

    setSocketInstance(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return [socketInstance];
};
