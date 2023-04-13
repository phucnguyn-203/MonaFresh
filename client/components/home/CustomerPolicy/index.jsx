import React from "react";
import Image from "next/image";

import GiaoHang from "@/public/assets/img/giaohang.png";
import DoiTra from "@/public/assets/img/doitra.png";

export default function CustomerPolicy() {
    return (
        <div className="mt-20 p-7 bg-white rounded-xl" data-aos="zoom-in">
            <h1 className="text-center text-[#1C1C1C] font-bold text-3xl">Chính sách khách hàng</h1>
            <div className="w-full flex flex-row mt-8">
                <div className="w-1/2 p-5 text-center h-full border-r-4 ">
                    <div className="w-auto mx-56 mb-4 items-center border-box ">
                        <Image src={GiaoHang} alt="" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-[#126f1f]">Giao hàng toàn quốc</h3>
                        <p className="text-lg  mt-2 mb-0 text-[#666666D9]">Ship COD toàn quốc</p>
                    </div>
                </div>
                <div className="w-1/2 p-5 text-center ">
                    <div className="w-auto mx-56 mb-4 items-center border-box ">
                        <Image src={DoiTra} alt="" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-[#126f1f]">Đổi trả miễn phí</h3>
                        <p className="text-lg  mt-2 mb-0 text-[#666666D9]">
                            Hàng hoá sẽ được đổi trả miễn phí nếu có lỗi do nhà sản xuất
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
