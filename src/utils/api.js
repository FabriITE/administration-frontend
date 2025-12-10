import axios from "axios";
import { API_URL, RRHH_API_URL } from "../../constants";

const api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

const rrhhApi = axios.create({
  // withCredentials: true,
  baseURL: RRHH_API_URL,
});

// session

export const getSessionData = async () => api.get("/getSessionData");

// clients

export const getActiveClients = async () => api.get("/getActiveClients");
export const getInactiveClients = async () => api.get("/getInactiveClients");
export const editClientInfo = async (data) => api.post("/editClientInfo", data);
export const registerPayment = async (data) =>
  api.post("/registerPayment", data);
export const addClientNotes = async (data) => api.post("/addClientNotes", data);
export const createClient = async (data) => api.post("/createClient", data);
export const paymentsMonthResume = async (data) =>
  api.post("/paymentsMonthResume", data);

export const getSelectedClient = async (data) =>
  api.post("/getSelectedClient", data);

export const getPaymentHistory = async (data) =>
  api.post("/getPaymentHistory", data);

// places
export const getCantonesOptions = async () => api.get("/getCantones");
export const getCantonesFilter = async (data) =>
  api.post("/getCantonesFilter", data);
export const getProvinciaOptions = async () => api.get("/getProvincias");
export const cancelClient = async (clientId) =>
  api.post("/cancelClient", clientId);

export const uploadClients = async (clientsList) =>
  api.post("/uploadClients", clientsList);
// notifications

export const getNotifications = async (data) =>
  await api.post("/getNotifications", data);
export const createNotification = async (data) =>
  await api.post("/createNotification", data);
export const notifyEmployees = async (data) =>
  await api.post("/notifyEmployees", data);
export const markNotificationAsRead = async (data) =>
  await api.post("/markAsRead", data);
export const markNotificationAsUnread = async (data) =>
  await api.post("/markAsUnread", data);
export const readAllNotifications = async (data) =>
  await api.post("/markAllAsRead", data);

// files
export const uploadFile = async (data) =>
  await rrhhApi.post("/uploadFile", data);
export const downloadFile = async (data) =>
  await rrhhApi.post("/downloadFile", data);
export const deleteFiles = async (data) =>
  await rrhhApi.post("/deleteFiles", data);
