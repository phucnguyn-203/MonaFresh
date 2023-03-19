import styles from "./styles.module.css";
import login from "../../assets/img/login-office.c7786a89.jpeg";

export default function Login() {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className="w-1/2">
                    <img
                        src={login}
                        alt="login.jpeg"
                        className="w-full h-full object-cover inline-block"
                    />
                </div>
                <div className="w-1/2 p-12">
                    <div className="h-full">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
                            Đăng Nhập
                        </h1>
                        <form>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="admin@gmail.com"
                                    className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="password"
                                    className="block text-sm text-gray-700"
                                >
                                    Mật Khẩu
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    className="block w-full h-12 px-3 py-1 text-sm rounded-md border-[1px] border-gray-200 bg-gray-100 focus:outline-none focus:bg-transparent"
                                />
                            </div>
                            <button className="w-full bg-primary text-white text-sm py-4 rounded-md">
                                Đăng Nhập
                            </button>
                            <hr className="my-10" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
