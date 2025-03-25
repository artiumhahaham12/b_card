import { Bounce, toast } from "react-toastify";

export function ToastRes(
  type: string,
  Msg: string,
  theme: string,
  close: number
) {
  switch (type) {
    case "success":
      toast.success(Msg, {
        position: "top-center",
        autoClose: close,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      break;
    case "error":
      toast.error(Msg, {
        position: "top-center",
        autoClose: close,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      break;

    case "info":
      toast.info(Msg, {
        position: "top-center",
        autoClose: close,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      break;
    case "warning":
      toast.warning(Msg, {
        position: "top-center",
        autoClose: close,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      break;

    default:
      break;
  }
}
