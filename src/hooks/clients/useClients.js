import { useDispatch, useSelector } from "react-redux";
import {
  cancelClient,
  clientActions,
  createClient,
  editClientInfo,
  getActiveClients,
  getClientQbInfo,
  getInactiveClients,
  getPaymentHistory,
  getSelectedClient,
  paymentsMonthResume,
  registerPayment,
} from "../../utils/api";
import {
  addClientPaymentHistory,
  addClients,
  addSelectedClient,
} from "../../features/clients";
import { addMonthInfo } from "../../features/monthInfo";

export const useClients = () => {
  const dispatch = useDispatch();

  const fecthActiveClients = async () => {
    const data = await getActiveClients();
    dispatch(addClients(data.data));
  };
  const fetchMonthInfo = async () => {
    const resume = await paymentsMonthResume({});
    dispatch(addMonthInfo(resume.data));
  };

  const fecthInactiveClients = async () => {
    const data = await getInactiveClients();
    dispatch(addClients(data.data));
  };

  const fetchSelectedClient = async (san, selectQbInfo) => {
    const client = await getSelectedClient({ san: san });
    let qb_info = {};
    if (selectQbInfo) {
      qb_info = await getClientQbInfo({
        customer_id: client.data.qb_customer_id,
      });
    }

    dispatch(addSelectedClient({ ...client.data, ...qb_info.data }));
  };

  const fecthPaymentHistory = async (client_id) => {
    const history = await getPaymentHistory({ client_id: client_id });
    dispatch(addClientPaymentHistory(history.data));
  };

  const registerClient = async (newClient) => {
    await createClient(newClient);
    await fecthActiveClients();
    await fetchMonthInfo();
  };

  const registerClientPayment = async (paymentData) => {
    await registerPayment(paymentData);
    await fecthActiveClients();
    await fetchMonthInfo();
  };

  const editClient = async (editedInfo) => {
    await editClientInfo(editedInfo);
    await fecthActiveClients();
    await fetchMonthInfo();
  };

  const markCancelClient = async (client_id) => {
    await cancelClient({ client_id: client_id });
    await fecthActiveClients();
    await fetchMonthInfo();
  };

  const manageClientActions = async (data) => {
    try {
      await clientActions(data);
      await fecthActiveClients();
      await fetchMonthInfo();
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  return {
    fecthActiveClients,
    fetchMonthInfo,
    registerClient,
    registerClientPayment,
    editClient,
    markCancelClient,
    fecthInactiveClients,
    fetchSelectedClient,
    fecthPaymentHistory,
    manageClientActions,
  };
};
