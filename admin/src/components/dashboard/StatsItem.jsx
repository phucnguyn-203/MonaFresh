export function StatsItem({ icon, title, value, backgroundColor }) {
    return (
        <div
            className={`${backgroundColor} p-4 border-none border-gray-200 dark:border-gray-800 w-1/3 text-white rounded-lg  text-center`}
        >
            <div className="mx-auto w-[30px] h-[30px]">{icon}</div>
            <div className="mt-2">
                <p className="text-base mb-3 font-medium text-gray-50 dark:text-gray-100">{title}</p>
                <p className="text-3xl font-bold leading-none text-gray-50 dark:text-gray-50 p-2">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(value)}
                </p>
            </div>
        </div>
    );
}
