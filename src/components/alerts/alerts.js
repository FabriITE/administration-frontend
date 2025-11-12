import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorAlert = (message, theme) => {
    toast.error(message, {
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: theme,
      stacked: true
    });
}
export const successAlert = (message, theme) => {
  toast.success(message, {
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: theme,
    stacked: true
  });
}
export const warningAlert = (message, theme) => {
  toast.warning(message, {
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: theme,
    stacked: true
  });
}
export const infoAlert = (message, theme) => {
  toast.info(message, {
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: theme,
    stacked: true
  });
}
