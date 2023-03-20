exports.STATUS = {
    PENDING: 1, //Chờ xác nhận
    CONFIRMED: 2, //Đã xác nhận
    DELIVERING: 3, //Đang giao
    DELIVERED: 4, //Đã giao
    CANCELED: 5, //Đã huỷ
    RETURNS: 6 //Trả hàng
}

exports.PAYMENT_STATUS = {
    UNPAID: 1, //Chưa thanh toán
    PAID: 2, //Đã thanh toán
}

exports.PAYMENT_METHOD = {
    ONL: 1, //Thanh toán online
    COD: 2, //Thanh toán khi nhận hàng
}
