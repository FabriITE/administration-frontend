import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  markNotificationAsRead,
  markNotificationAsUnread,
  readAllNotifications,
} from "../../utils/api";
import { addNotifications } from "../../features/notifications";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const employee_id = useSelector((state) => state.session?.employee_id);

  const getNotificationsAll = async (id) => {
    const data = await getNotifications({ employee_id: id, role: "admin" });
    dispatch(addNotifications(data.data));
  };

  const fetchNotifications = async (id) => {
    await getNotificationsAll(id);
  };

  const readNotification = async (notification_id) => {
    const x = await markNotificationAsRead({
      notification_id: notification_id,
    });
    await getNotificationsAll(employee_id);
  };

  const unReadNotification = async (notification_id) => {
    const x = await markNotificationAsUnread({
      notification_id: notification_id,
    });
    await getNotificationsAll(employee_id);
  };

  const markAsReadAllNotifications = async () => {
    await readAllNotifications({ employee_id: employee_id });
    await getNotificationsAll(employee_id);
  };

  return {
    fetchNotifications,
    readNotification,
    unReadNotification,
    markAsReadAllNotifications,
  };
};
