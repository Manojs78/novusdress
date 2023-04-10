import { toast } from "react-toastify";

const common = {
  position: "top-right",
  className: "app_toast",
  autoClose: 1000
};

export default function toastMessage({ message = '', type = 'success', ...rest }) {
  if (type === "success") {
    return toast.success(message, {
      ...common,
      ...rest
    })
  }

  if (type === 'error') {
    return toast.error(message, {
      ...common,
      ...rest
    })
  }
}
