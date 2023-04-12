import React from "react";
import Image from "next/image";

import Certifi_1 from "@/public/assets/img/Certifi_1.jpg";
import Certifi_2 from "@/public/assets/img/Certifi_2.jpg";
import Certifi_3 from "@/public/assets/img/Certifi_3.jpg";
import Certifi_4 from "@/public/assets/img/Certifi_4.jpg";

export default function Certificateds() {
    return (
        <div className="mt-20 p-7 bg-white " data-aos="fade-up">
            <div className="text-center">
                <span className="text-[#1C1C1C] font-bold text-3xl">Cam kết của chúng tôi</span>
            </div>
            <div className="mt-5 mx-7 flex flex-row justify-evenly">
                <Image src={Certifi_1} />
                <Image src={Certifi_2} />
                <Image src={Certifi_3} />
                <Image src={Certifi_4} />
            </div>
        </div>
    );
}
