export const USER_ROLES = {
  ADMIN: 1,
  CUSTOMER: 2,
  STAFF: 3,
};

export const ORDER_STATUS = {
  PENDING: 1, //Chờ xác nhận
  CONFIRMED: 2, //Đã xác nhận
  DELIVERING: 3, //Đang giao
  DELIVERED: 4, //Đã giao
  CANCELED: 5, //Đã huỷ
  RETURNS: 6, //Trả hàng
};

export const PAYMENT_STATUS = {
  UNPAID: 1, //Chưa thanh toán
  PAID: 2, //Đã thanh toán
};

export const PAYMENT_METHOD = {
  COD: 1, //Thanh toán khi nhận hàng
  ONL: 2, //Thanh toán online
};

export const INVOICE_TYPE = {
  IMPORT: 1,
  EXPORT: 2,
};
