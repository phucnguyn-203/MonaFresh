import React from "react";
import Image from "next/image";

import Certifi_1 from "@/public/assets/img/Certifi_1.jpg";
import Certifi_2 from "@/public/assets/img/Certifi_2.jpg";
import Certifi_3 from "@/public/assets/img/Certifi_3.jpg";
import Certifi_4 from "@/public/assets/img/Certifi_4.jpg";

export default function Certificates() {
  return (
    <div className="mt-20 bg-white py-8" data-aos="fade-up">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-[#1C1C1C] font-bold text-3xl">
            Cam kết của chúng tôi
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <Image src={Certifi_1} alt="" />
          <Image src={Certifi_2} alt="" />
          <Image src={Certifi_3} alt="" />
          <Image src={Certifi_4} alt="" />
        </div>
      </div>
    </div>
  );
}
