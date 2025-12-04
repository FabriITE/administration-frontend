import { useDispatch, useSelector } from "react-redux";
import {
  cancelClient,
  createClient,
  editClientInfo,
  getActiveClients,
  paymentsMonthResume,
  registerPayment,
} from "../../utils/api";
import { addClients } from "../../features/clients";
import { addMonthInfo } from "../../features/monthInfo";

export const useClients = () => {
  const dispatch = useDispatch();

  //   const clienrs = useSelector((state) => state.session?.employee_id);

  const fecthActiveClients = async () => {
    const data = await getActiveClients();
    dispatch(addClients(data.data));
  };
  const fetchMonthInfo = async () => {
    const resume = await paymentsMonthResume({});
    dispatch(addMonthInfo(resume.data));
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
  return {
    fecthActiveClients,
    fetchMonthInfo,
    registerClient,
    registerClientPayment,
    editClient,
    markCancelClient,
  };
};
