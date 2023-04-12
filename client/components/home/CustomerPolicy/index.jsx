import React from "react";
import Image from "next/image";

import GiaoHang from "@/public/assets/img/giaohang.png";
import DoiTra from "@/public/assets/img/doitra.png";

export default function Policy() {
    return (
        <div className="mt-20 p-7 bg-white rounded-xl" data-aos="fade-up">
            <h3 className="font-sans flex flex-row items-center text-center justify-evenly w-full">
                {/* <b className="box-boder flex flex-row bg-black text-xs w-[376px] h-[2px]"></b> */}
                <span className="text-[#1C1C1C] font-bold text-3xl">Chính sách khách hàng</span>
                {/* <b className="box-boder flex flex-row bg-black text-xs w-96 h-[2px]"></b> */}
            </h3>
            <div className="w-full flex flex-row mt-8">
                <div className="w-1/2 p-5 text-center h-full border-r-4 ">
                    <div className="w-auto mx-56 mb-4 items-center border-box ">
                        <Image src={GiaoHang} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-[#126f1f]">Giao hàng toàn quốc</h3>
                        <p className="text-lg  mt-2 mb-0 text-[#666666D9]">Ship COD toàn quốc</p>
                    </div>
                </div>
                <div className="w-1/2 p-5 text-center ">
                    <div className="w-auto mx-56 mb-4 items-center border-box ">
                        <Image src={DoiTra} />
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
