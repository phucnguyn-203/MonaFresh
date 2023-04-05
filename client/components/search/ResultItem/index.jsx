import Link from "next/link";
import Image from "next/image";
import formatCurrency from "../../../utils/formatCurrency";

export default function ResultItem({ thumnail, name, price }) {
    return (
        <Link
            href="/"
            className="p-4 hover:bg-slate-200 hover:rounded-lg flex items-center "
        >
            <Image
                src={thumnail}
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
    );
}
