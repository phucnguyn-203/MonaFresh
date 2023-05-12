import { Link } from "react-router-dom";
import notfound from "../../assets/img/404.svg";

export default function NotFoundPage() {
    return (
        <div className="px-6 py-16 lg:py-20 h-screen flex flex-col items-center justify-center">
            <img width={650} height={450} src={notfound} />
            <h1 className="text-3xl font-bold">Không tìm thấy trang</h1>
            <Link
                to="/"
                className="mt-10 text-white font-medium bg-primary px-12 py-3 rounded-md"
            >
                Trở Lại
            </Link>
        </div>
    );
}
