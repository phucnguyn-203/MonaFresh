import { Link } from "react-router-dom";
import formatCurrency from "../../../utils/formatCurrency";

export default function ResultItem({ thumnail, name, price }) {
    return (
        <Link className="p-4 hover:bg-slate-200 hover:rounded-lg flex items-center ">
            <div className="flex items-center ">
                <img
                    src={thumnail}
                    alt=""
                    className="w-full h-full rounded-lg"
                />
            </div>
            <div className="text-center px-1 text-xs">{name}</div>
            <span className="text-xs text-green-600 font-bold">
                {formatCurrency(price)}
            </span>
        </Link>
    );
}
