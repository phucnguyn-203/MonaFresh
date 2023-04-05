import Breadcrumb from "@/components/shared/Breadcrumb";
import Sidebar from "@/components/shop/Sidebar";
import Products from "@/components/shop/Products";

export default function Shop() {
    const breadcrumb = [
        {
            title: "trang chủ",
            path: "/",
        },
        {
            title: "cửa hàng",
            path: "/shop",
        },
    ];
    return (
        <div className="container">
            <div className="pt-8 flex items-center justify-between">
                <div className="text-xl text-black">
                    <Breadcrumb breadcrumb={breadcrumb} />
                </div>
                <div className="flex items-center">
                    <p className="mr-[20px] text-base">
                        Hiển thị một kết quả duy nhất
                    </p>
                    <select className="text-base border-solid border-gray-400 shadow-md shadow-gray-300 p-2 outline-none">
                        <option>Thứ tự mặc định</option>
                        <option>Mới nhất</option>
                        <option>Thứ tự giá từ thấp đến cao</option>
                        <option>Thứ tự giá từ cao đến thấp</option>
                    </select>
                </div>
            </div>
            <div className="flex mt-[40px] gap-x-6  ">
                <Sidebar />
                <Products />
            </div>
        </div>
    );
}
