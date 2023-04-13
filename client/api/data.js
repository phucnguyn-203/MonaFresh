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
        title: "Thịt trứng",
    },
];

const products = [
    {
        id: 1,
        name: "Bắp cải tím hữu cơ 1kg",
        price: 135000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
        category: 3,
        // percentageDiscount: 0.2,
        images: [
            "https://product.hstatic.net/200000423303/product/bap-cai-tim-huu-co_203f203060064cf5a24b9f8e9c352214_large.jpg",
            "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2022/July/12/12805-277401657617210-1657617210--400x400.jpg",
            "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8736-278031623999476-1623999476--400x400.jpg",
            "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8737-409491623999484-1623999484--400x400.jpg",
            "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
            "https://y5kbp0ifnvobj.vcdn.cloud/uploads/filecloud/2021/June/18/8738-974711623999484-1623999484--400x400.jpg",
        ],
    },
    {
        id: 2,
        name: "Ngô Bình Định 350g",
        price: 35000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/ngongot_efdb710405b44b06a1ea02e5db5cf3f9_large.jpg",
        category: 1,
        percentageDiscount: 0.45,
    },
    {
        id: 3,
        name: "Bí đỏ nhà trồng 400g",
        price: 84000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/bi-hat-dau-huu-co_a9a76ed27a1a4dcdac41e8a857f1590f_large.jpg",
        category: 5,
        percentageDiscount: 0.2,
    },
    {
        id: 4,
        name: "Cà chua Đà Lạt 400g",
        price: 71500,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/ca-chua-bee-cherry-huu-co_2afe5b08b1f242809cac54171701fff4_large.jpg",
        category: 2,
        percentageDiscount: 0.2,
    },

    {
        id: 5,
        name: "Cà rốt Chị Hằng 1kg",
        price: 135000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/ca-rot-huu-co_051657cb99144443bac8015f6dd34dae_large.jpg",
        category: 3,
        percentageDiscount: 0.2,
    },
    {
        id: 6,
        name: "Cải bó xanh 350g",
        price: 35000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/cai-ngong-huu-co_7040d71c8df64334be916ea10db3d897_large.jpg",
        category: 1,
        percentageDiscount: 0.2,
    },
    {
        id: 7,
        name: "Chanh hữu cơ 400g",
        price: 84000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/chanh-vang_49d0a0eed2f64de39773602c0f675292_large.jpeg",
        category: 5,
        percentageDiscount: 0.2,
    },
    {
        id: 8,
        name: "Nấm rừng 400g",
        price: 71500,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/combo_gia_dinh_nam_tuoi_hon_hop_huu_co_400g_cdcc732b11944aeeac86297b39d880cb_large.jpg",
        category: 2,
        percentageDiscount: 0.25,
    },
    {
        id: 9,
        name: "Củ dền hữu cơ 1kg",
        price: 135000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/cu-den-huu-co_5b7a9b55f9674d91bba675d05f47acb1_large.jpg",
        category: 3,
        percentageDiscount: 0.2,
    },
    {
        id: 10,
        name: "Rừng Đồng Nai 350g",
        price: 35000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/gung-huu-co_607c3c7e7e294cb49bf3dcfb2c0ad705_large.jpg",
        category: 1,
        percentageDiscount: 0.2,
    },
    {
        id: 11,
        name: "Khoai lang mật 400g",
        price: 84000,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/khoai-mat-huu-co_6acf11bc200d4d0a82cae134bbad21d7_large.jpg",
        category: 5,
        percentageDiscount: 0.2,
    },
    {
        id: 12,
        name: "Ớt chuông khổng lồ 400g",
        price: 71500,
        thumbnail:
            "https://product.hstatic.net/200000423303/product/ot-chuong-vang-huu-co.jpg_d5646be6f8834c068c1f4cc0626dc1bd_large.png",
        category: 2,
        percentageDiscount: 0.2,
    },
];

export { categories, products };
