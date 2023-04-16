const categories = [
  {
    id: 1,
    title: "Rau củ",
  },
  {
    id: 2,
    title: "Hải sản",
  },
  {
    id: 3,
    title: "Trái cây",
  },
  {
    id: 4,
    title: "Đồ khô",
  },
  {
    id: 5,
    title: "Thịt",
  },
];

const products = [
  {
    id: 0,
    name: "Bắp cải tím hữu cơ 1kg",
    price: 46000,
    thumbnail:
      "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
    category: {
      id: 1,
      name: "Rau củ",
    },
    quantity: 10,
    percentageDiscount: 0,
    images: [
      "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/12/12805-277401657617210-1657617210--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8736-278031623999476-1623999476--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8737-409491623999484-1623999484--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 15,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 1,
    name: "Bưởi năm roi",
    price: 55000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
    category: {
      id: 3,
      name: "Trái cây",
    },
    quantity: 12,
    percentageDiscount: 0.25,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
    ],
    ratingsAverage: 4,
    ratingsQuantity: 20,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    name: "Gạo lứt tím hữu cơ Mùa 2kg",
    price: 189000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
    category: {
      id: 4,
      name: "Đồ khô",
    },
    quantity: 12,
    percentageDiscount: 0,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    name: "Thăn bò Kobe",
    price: 500000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
    category: {
      id: 5,
      name: "Thịt",
    },
    quantity: 12,
    percentageDiscount: 0.2,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
    ],
    ratingsAverage: 4.2,
    ratingsQuantity: 1000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    name: "Bắp cải tím hữu cơ 1kg",
    price: 46000,
    thumbnail:
      "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
    category: {
      id: 1,
      name: "Rau củ",
    },
    quantity: 10,
    percentageDiscount: 0,
    images: [
      "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/12/12805-277401657617210-1657617210--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8736-278031623999476-1623999476--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8737-409491623999484-1623999484--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 15,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    name: "Bưởi năm roi",
    price: 55000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
    category: {
      id: 3,
      name: "Trái cây",
    },
    quantity: 12,
    percentageDiscount: 0.25,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8586-149551623982924-1623982924--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/13/12822-875081657688748-1657688748--400x400.jpg",
    ],
    ratingsAverage: 4,
    ratingsQuantity: 20,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 6,
    name: "Gạo lứt tím hữu cơ Mùa 2kg",
    price: 189000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
    category: {
      id: 4,
      name: "Đồ khô",
    },
    quantity: 12,
    percentageDiscount: 0,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
    ],
    ratingsAverage: 4.5,
    ratingsQuantity: 100,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 7,
    name: "Thăn bò Kobe",
    price: 500000,
    thumbnail:
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
    category: {
      id: 5,
      name: "Thịt",
    },
    quantity: 12,
    percentageDiscount: 0.2,
    images: [
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
    ],
    ratingsAverage: 4.2,
    ratingsQuantity: 1000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const carts = [
  {
    id: 0,
    product: {
      id: 0,
      name: "Bắp cải tím hữu cơ 1kg",
      price: 46000,
      thumbnail:
        "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
      category: {
        id: 1,
        name: "Rau củ",
      },
      quantity: 10,
      percentageDiscount: 0,
      images: [
        "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/12/12805-277401657617210-1657617210--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8736-278031623999476-1623999476--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8737-409491623999484-1623999484--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
      ],
      ratingsAverage: 4.5,
      ratingsQuantity: 15,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    quantity: 4,
  },
  {
    id: 1,
    product: {
      id: 7,
      name: "Thăn bò Kobe",
      price: 500000,
      thumbnail:
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
      category: {
        id: 5,
        name: "Thịt",
      },
      quantity: 12,
      percentageDiscount: 0.2,
      images: [
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/27/13175-694581658891002-1658891002--400x400.png",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/June/7/12456-495691654617272-1654617272--400x400.png",
      ],
      ratingsAverage: 4.2,
      ratingsQuantity: 1000,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    quantity: 3,
  },
  {
    id: 2,
    product: {
      id: 6,
      name: "Gạo lứt tím hữu cơ Mùa 2kg",
      price: 189000,
      thumbnail:
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
      category: {
        id: 4,
        name: "Đồ khô",
      },
      quantity: 12,
      percentageDiscount: 0,
      images: [
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/19/13005-668731658203936-1658203936--400x400.jpg",
        "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/9/8434-295991623230771-1623230771--400x400.jpg",
      ],
      ratingsAverage: 4.5,
      ratingsQuantity: 100,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    quantity: 2,
  },
];

export { categories, products, carts };
