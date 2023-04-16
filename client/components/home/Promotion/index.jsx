import Link from "next/link";
import Image from "next/image";

import discount1 from "@/public/assets/img/index_promotion_1_large.png";
import discount2 from "@/public/assets/img/index_promotion_2_large.jpg";
import discount3 from "@/public/assets/img/index_promotion_3_large.jpg";
import discount4 from "@/public/assets/img/index_promotion_4_large.png";

export default function Promotion() {
  const data = [
    {
      url: discount1,
      path: "/shop",
    },
    {
      url: discount2,
      path: "/shop",
    },
    {
      url: discount3,
      path: "/shop",
    },
    {
      url: discount4,
      path: "/shop",
    },
  ];
  return (
    <div className="mt-20" data-aos="fade-up">
      <h1 className="text-[#1C1C1C] text-center text-3xl font-bold mb-12">
        Chương trình khuyến mãi
      </h1>
      <div className="grid grid-cols-4 gap-x-4">
        {data.map(({ url, path }) => (
          <div key={url.src} className="overflow-hidden">
            <Link href={path}>
              <Image
                src={url}
                alt={path}
                className="hover:scale-110 transition-transform ease-linear duration-300"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
