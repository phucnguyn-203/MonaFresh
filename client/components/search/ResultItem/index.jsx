import Link from "next/link";
import Image from "next/image";
import formatCurrency from "../../../utils/formatCurrency";
import { useState } from "react";

export default function ResultItem({ id, thumbnail, name, price }) {
  const [showResult, setShowResult] = useState(false);

  const handleClickLink = () => {
    setShowResult(!showResult);
    setSearchKeyword("");
  };

  return (
    <div>
      <Link
        href={`/shop/${id}`}
        className="p-4 hover:bg-slate-200 hover:rounded-lg flex items-center "
        onClick={handleClickLink}
      >
        <Image
          src={thumbnail}
          alt=""
          className="rounded-lg"
          width={80}
          height={80}
        />
        <div className="text-center px-1 text-xs">{name}</div>
        <span className="text-xs text-green-600 font-bold">
          {formatCurrency(price)}
        </span>
      </Link>

      {showResult && <div></div>}
    </div>
  );
}
