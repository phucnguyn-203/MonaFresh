import Link from "next/link";
import Image from "next/image";
import jsUcfirst from "@/utils/jsUcfirst";
import formatCurrency from "../../../utils/formatCurrency";
import { useState } from "react";

export default function ResultItem({
  id,
  thumbnail,
  name,
  price,
  handleClickResultItem,
}) {
  return (
    <div>
      <Link
        href={`/shop/${id}`}
        className="p-4 hover:bg-slate-200 hover:rounded-lg flex items-center "
        onClick={handleClickResultItem}
      >
        <Image
          src={thumbnail}
          alt="product"
          className="rounded-lg"
          width={80}
          height={80}
        />
        <div className="text-center px-1 text-xs">{jsUcfirst(name)}</div>
        <span className="text-xs text-green-600 font-bold">
          {formatCurrency(price)}
        </span>
      </Link>
    </div>
  );
}
