import { ORDER_STATUS } from "./Constant";
export default function formatOrderStatus(status) {
  if (status === ORDER_STATUS.PENDING) {
    return "Chờ xác nhận";
  } else if (status === ORDER_STATUS.CONFIRMED) {
    return "Đã xác nhận";
  } else if (status === ORDER_STATUS.DELIVERING) {
    return "Đang giao hàng";
  } else if (status === ORDER_STATUS.DELIVERED) {
    return " Đã giao hàng";
  } else if (status === ORDER_STATUS.CANCELED) {
    return "Đã huỷ";
  } else {
    return "Trả hàng";
  }
}
